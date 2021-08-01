import A from "socket.io-client"
import axios from 'axios';
let url = "http://5085f3f5feff.ngrok.io"
export const musicUrl = "http://50e3dd71caa0.ngrok.io"
export const API = axios.create({baseURL: url+`/blogger`});
// Alter defaults after instance has been created
export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.common['Authorization'];
	}
};
export const path = url+"/blogger/single/"
export const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};
// export const Socket = A("http://192.168.10.120:3004")