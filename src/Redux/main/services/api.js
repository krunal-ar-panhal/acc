import {apiPath, tokenName} from '@/Constants';
import { getSessionData } from '@/Helper';
import axios from 'axios';
// import https from 'https';
// console.log(getBtoken())
// const username = 'RESTUSER';
// const password = 'Sxzaqw@1234';
 axios.defaults.headers.common = {};

// const _token = `Basic ${btoa(username + ':' + password)}`;
export const instance =  axios.create({
	baseURL: apiPath,
	// httpsAgent: new https.Agent({
	// 	rejectUnauthorized: false

	//   }),
	// httpsAgent: {
    //     rejectUnauthorized: false
    //   },
	//   proxy:false,
	// auth:{username:username,password:password},
	// proxy:{
	// 	host: 'https://awscpwddp01.cpwdcld.net',
	// 	port: 50001,
	// 	auth:{username:username,password:password},
	// 	// protocol: string
	//   },
	headers: {
		// 'Content-type': 'application/json',
		'Content-Type': 'multipart/form-data',
		// 'Accept': '*/*',
		// 'Accept-Encoding': 'gzip, deflate, br',
        'Access-Control-Allow-Origin': '*', // Replace '*' with the appropriate origin if needed
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		// 'Authorization': _token ,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',

	},

});
instance.interceptors.request.use(
	(config) => {
	  const token = getSessionData(tokenName);
	//   console.log(token)
	  if (token) {
		config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
		// config.headers["x-access-token"] = token; // for Node.js Express back-end
	  }
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
