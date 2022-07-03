//defining the reducers for the redux global state for the application
//this will change the state of the app depending upon the type of action
import {Register_user, Login_user, Auth_user, Logout_user} from '../actions/types';

// const user = JSON.parse(localStorage.getItem("user"));
// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };
const initialState = {};
export default function( state=initialState, action){
    switch(action.type){
        case Register_user:
            return{...state, register: action.payload }
        case Login_user:
            return{...state, loginSuccess: action.payload }
        case Auth_user:
            return{...state, userData: action.payload }
        case Logout_user:
            return{...state}
        default:
            return state;
    }
};
