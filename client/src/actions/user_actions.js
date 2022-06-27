import axios from "axios";
import {
    Register_user,
    Login_user,
    Auth_user,
    Logout_user,
} from './types';

const user_server = '/api/users';

export function registerUser(dataToSubmit){
    const req = axios.post(`${user_server}/register`, dataToSubmit)
    .then(res => res.data);

    return{
        type: Register_user,
        payload: req
    }
}

export function loginUser(dataToSubmit){
    const req = axios.post(`${user_server}/login`, dataToSubmit)
    .then(res => res.data);

    return{
        type: Login_user,
        payload: req
    }
}

export function auth(){
    const req = axios.get(`${user_server}/auth`)
    .then(res => res.data);

    return {
        type: Auth_user,
        payload: req
    }
}

export function logoutUser(){
    const req = axios.get(`${user_server}/logout`)
    .then(res => res.data);

    return{
        type: Logout_user,
        payload: req
    }
}