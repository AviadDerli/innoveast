import { io } from 'socket.io-client';

const URL = 'https://innoveast.onrender.com';
export const socket = io(URL, {
  // autoConnect: false,
});
