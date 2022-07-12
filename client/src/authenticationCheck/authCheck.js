import React, {useEffect} from 'react';
import {auth} from '../actions/user_actions';
import { useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute=null){
    // console.log(option);
  const navigate = useNavigate();
    function AuthenticationCheck(props){
        // console.log(props);
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect( () => {
            dispatch( auth() ).then(res => {
                //user is not logged in
                if(!res.payload.isAuth){
                //   console.log("i am inside not logged in part");
                    if(option){
                        // props.history.push("/login");
                        
                        navigate('/login');
                    }
                }
                //user is logged in
                else{
                    //supposed to be Admin page, but a non-admin person wants to access it
                    // console.log("i am inside the logged in part");
                    if(adminRoute!==null && !res.payload.isAdmin){
                        console.log("i am inside the first if");
                        navigate('/');
                    }else{
                        // if(option === false){
                        //     console.log('i am inside the else of logged in paart');
                        //     navigate('/');
                        // }
                    }
                }
            })
        }, []);

        return (<SpecificComponent {...props} user={user} />)
    }

    return AuthenticationCheck();
}
