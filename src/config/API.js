import SocketIOClient from "socket.io-client"
import axios from 'axios';
// let url = "http://be-blogger-v1.localhost/"
let url = "https://v2-blogger-server.zilog.club"
const socketURL = "https://v2-blogger-server.zilog.club/"
export const musicUrl = "https://v2-blogger-server.zilog.club/blogger/api/v2.1/music/"
export const hostshare= "https://blogger.zilog.tech#/share/"
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