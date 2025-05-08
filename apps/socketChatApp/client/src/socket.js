import { io } from "socket.io-client";

export const URL = "http://localhost:4545";

export const socket = io(URL, { autoConnect: false });
