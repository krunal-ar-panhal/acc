// api.js
// const addProxyMiddleware = require('./addProxyMiddleware');
// addProxyMiddleware(app);
// import { sessionName, tokenName } from "@/Constants";
import {instance}  from "../services/api";
// Simulated API function to fetch data
// export const logoutAPI = async () => {

    // sessionStorage.removeItem(sessionName);
    // sessionStorage.removeItem(tokenName);


// }
export const loginAPI = async (params) => {
    const requestBody = params;
    
    const promise = new Promise (async(resolve, reject) => {
        instance.defaults.headers.common = {};

		const response = await instance.post('login',requestBody).then((res) => {
            // dispatch({type: 'GET_NEWS', value: res.data.data})
            // console.log(res);
            resolve(res)
        }, (err) => {
            // console.log(err.response.data)
            reject(err.response.data??err.response)
        });
        return response;
	})

	return promise;

  };
