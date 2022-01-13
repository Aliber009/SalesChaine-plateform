import axios from 'axios';
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL+'/',
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});


export const getAll = async () => (
    await instance.post('users/all')
);

export const register = async (name, email, password, phone, agency, role) => (
    await instance.post('users/register', {name, email, password, phone, agency, role})
);

export const confirmRegister = async id => (
    await instance.post(`users/confirm/${id}`)
);

export const forgotPassword = async email => (
    await instance.post('users/forgotpassword', {email})
);

export const confirmReset = async (id, password) => (
    await instance.post(`users/resetpass/${id}`, {password})
);

export const login = async (email, password) => (
    await instance.post('users/login', {email, password})
);

export const logout = async () => (
    await instance.post('users/logout', )
);

export const edit = async (userID, name, email) => (
    await instance.post('/users/edit', {userID, name, email})
);
export const associate = async (email, deviceId) => {
    //get senderUser Id 
      return await instance.post('users/associate',  {email, deviceId})
};
export const registerassociate = async (name, password, key) => (
    await instance.post('users/registerassociate',  {name, password, key  })
);
export const associateafterregister = async ( key ) => (
    await instance.post('users/associatewhenregister',  { key })
);

