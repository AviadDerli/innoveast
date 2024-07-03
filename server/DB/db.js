require('dotenv').config();
const mongoose = require('mongoose');
const serveyService = require('./survey.service');

const mongoURL = process.env.MONGO_URL;
console.log({ mongoURL });

const connect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};

const saveResponse = async (response) => {
    try {
        const result = await serveyService.createSurvey(response);
        console.log('Response saved');
        return result;
    } catch (err) {
        console.error('Error saving response:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
}

const getAllResponses = async () => {
    try {
        const result = await serveyService.getAllSurveys();
        console.log('All responses fetched');
        return result;
    } catch (err) {
        console.error('Error fetching responses:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
}

module.exports = { connect, saveResponse, getAllResponses };