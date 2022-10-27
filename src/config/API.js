import SocketIOClient from "socket.io-client"
import axios from 'axios';
// let url = "http://be-blogger-v1.localhost/"
let url = "https://be-server.zilog.online"
<<<<<<< HEAD
const socketURL = "https://be-server.zilog.online/"
export const musicUrl = "https://be-server.zilog.online/blogger/api/v2.1/music/"
export const hostshare= "https://be-server.zilog.online/share/"
=======
const socketURL = "https://be-server.zilog.online"
export const musicUrl = "https://be-server.zilog.online/blogger/api/v2.1/music/"
export const video_url = "https://be-server.zilog.online/blogger/api/v2.1/watch/video"
export const hostshare= "https://be-server.zilog.online/#/share/"
>>>>>>> 95911bfc78e08e62faac7687352b6a4198852cc3
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
