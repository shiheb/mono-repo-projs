import { io } from "socket.io-client";

export const URL = "http://192.168.50.180:4545";

export const socket = io.connect(URL);
