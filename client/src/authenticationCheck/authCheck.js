import React, {useEffect} from 'react';
import {auth} from '../actions/user_actions';
import { useSelector, useDispatch} from 'react-redux';
// import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute=null){
    // const navigate = useNavigate();
    function AuthenticationCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect( () => {
            dispatch( auth() ).then(res => {
                //user is not logged in
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push("/login");
                    }
                }
                //user is logged in
                else{
                    //supposed to be Admin page, but a non-admin person wants to access it
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/');
                    }else{
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
            })
        }, []);

        return (<SpecificComponent {...props} user={user} />)
    }

    return AuthenticationCheck();
}
