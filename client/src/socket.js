import { io } from 'socket.io-client';

const URL = 'http://localhost:9876';
export const socket = io(URL, {
  // autoConnect: false,
});
