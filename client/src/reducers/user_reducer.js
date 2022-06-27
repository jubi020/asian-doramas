import {Register_user, Login_user, Auth_user, Logout_user} from '../actions/types';

export default function( state={}, action){
    switch(action.type){
        case Register_user:
            return{...state, register: action.payload}
        case Login_user:
            return{...state, loginSuccess: action.payload}
        case Auth_user:
            return{...state, userData: action.payload}
        case Logout_user:
            return{...state}
    }
    return state;
};