import { instance } from '../services/api';
import { capitalizeFirstLetter } from "../../../Helper";

// Function to get dynamic headers based on entity
const getHeaders = (entity) => {
    let headers = {};

    if (entity === 'category'||entity === 'product') {
        headers = {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
          };
    } else {
        headers = {
            'Content-Type': 'application/json',
        };
    }

    return headers;
};

const api = {
    detail: (entity, id, params) => instance.get(`${entity}/list/${id}`, { params, headers: getHeaders(entity) }),
    fetch: (entity, params) => instance.get(`${entity}${entity!='subscribe'?'/list':''}`, { params, headers: getHeaders(entity) }),
    create: (entity, data) => instance.post(`${entity}/add`, data, { headers: getHeaders(entity) }),
    update: (entity, data, id) => instance.post(`${entity}/update/${id}`, data, { headers: getHeaders(entity) }),
    delete: (entity, id) => instance.delete(`${entity}/delete/${id}`, { headers: getHeaders(entity) }),
    activeList: (entity, params) => instance.get(`${entity}/active${capitalizeFirstLetter(entity)}`, { params, headers: getHeaders(entity) }),
};

export default api;
