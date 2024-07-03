require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./DB/db');
db.connect();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

let responses = [];

const serveyRouter = require('./DB/survey.router');
app.use('/survey', serveyRouter);

io.on('connection', async (socket) => {
  console.log('a user connected');
  
  try {
    responses = await db.getAllResponses();
    socket.emit('updateResponses', responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    socket.emit('error', 'Failed to fetch responses');
  }

  socket.on('newResponse', async (response) => {
    try {
      const phoneExists = responses.some(r => r.phone === response.phone);
      if (phoneExists) {
        socket.emit('error', 'Phone number already exists');
        return;
      }
      const savedResponse = await db.saveResponse(response);
      responses.push(savedResponse);
      io.emit('updateResponses', responses);
    } catch (error) {
      console.error('Error saving response:', error);
      socket.emit('error', 'Failed to save response');
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});