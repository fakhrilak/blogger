import SocketIOClient from "socket.io-client"
import axios from 'axios';
const socketURL = "https://blogger-server.zilog.club"
let url = "https://blogger-server.zilog.club"
export const musicUrl = "https://blogger-server.zilog.club/blogger/api/v2.1/music/"
// export const musicUrl = "http://192.168.10.120:7000"
export const API = axios.create({baseURL: url+`/blogger/api/v2.1/`});
export const Socket = SocketIOClient(socketURL)
// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
export const path = url+"/blogger/api/v2.1/single/"
export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
// export const Socket = A("http://192.168.10.120:3004")