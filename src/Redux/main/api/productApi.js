// api.js
// const addProxyMiddleware = require('./addProxyMiddleware');
// addProxyMiddleware(app);
// import { sessionName, tokenName } from "@/Constants";
import {instance}  from "../services/api";
// Simulated API function to fetch data
export const categoryListApi = async () => {
    // const requestBody = params;
    
    const promise = new Promise (async(resolve, reject) => {
        instance.defaults.headers.common = {};

		const response = await instance.get('category/list').then((res) => {
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

  export const saveCategoryApi = async (params) => {
    // const requestBody = params;
    
    const promise = new Promise (async(resolve, reject) => {
        instance.defaults.headers.common = {};

		const response = await instance.post('category/add',params).then((res) => {
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
  export const updateCategoryApi = async (params,id) => {
    // const requestBody = params;
    
    const promise = new Promise (async(resolve, reject) => {
        instance.defaults.headers.common = {};

		const response = await instance.post(`category/update/${id}`,params).then((res) => {
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
  export const deleteCategoryApi = async (params) => {
    // const requestBody = params;
    
    const promise = new Promise (async(resolve, reject) => {
        instance.defaults.headers.common = {};

		const response = await instance.delete(`category/delete/${params}`).then((res) => {
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
