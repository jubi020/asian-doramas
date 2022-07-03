import React, {useEffect} from 'react';
import {auth} from '../actions/user_actions';
import { useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute=null){
  const navigate = useNavigate();
    function AuthenticationCheck(props){

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect( () => {
            dispatch( auth() ).then(res => {
                //user is not logged in
                if(!res.payload.isAuth){
                //   console.log(res);
                //   console.log(option);
                    if(option){
                        // props.history.push("/login");
                        
                        navigate('/login');
                    }
                }
                //user is logged in
                else{
                    //supposed to be Admin page, but a non-admin person wants to access it
                    // console.log("option in authcheck is", option);
                    if(adminRoute && !res.payload.isAdmin){
                        navigate('/');
                    }else{
                        if(option === false){
                            navigate('/');
                        }
                    }
                }
            })
        }, []);

        return (<SpecificComponent {...props} user={user} />)
    }

    return AuthenticationCheck();
}
