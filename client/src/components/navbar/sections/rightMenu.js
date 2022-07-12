import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useSelector} from "react-redux";
import { useNavigate} from 'react-router-dom';
import {Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


function RightMenu(){

    let user = useSelector(state => state.user);

    const user_server = '/api/users';
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${user_server}/logout`).then(res => {
            if(res.status === 200){
                window.localStorage.removeItem('userId');
            //   setIsAuth(false);
                // window.location.reload(true);
                navigate('/');
            }else{
                alert('logout failed');
            }
        });
    };

    if(window.localStorage.getItem('userId') == null){
        return (
            <>
                <Link to='/register'>
                    <Button variant='primary'>Sign Up</Button>
                </Link>
                <Link to='/login'>
                <Button variant='primary' style={{marginLeft:'10px'}}>Log In</Button>
                </Link>
                
            </>
        );
    }
    else{
        return(
            <>
                <Button variant="primary" 
                onClick={logoutHandler}>
                Logout
                </Button>
            </>
        );
    }

    // if(user != null){
    //     return(
    //         <>
    //             <Button onClick={logoutHandler}>Log out</Button>
    //         </>
    //     );
    // }else{
    //     return (
    //         <ButtonGroup>
    //             <Button className='btn btn-secondary'><a href='/register' style={{textDecoration:"none", color:"black"}}>Sign Up</a></Button>
    //             <Button className='btn btn-secondary'><a href='/login'style={{textDecoration:"none", color:"black"}}>Log in</a></Button>
    //         </ButtonGroup>
    //     );
    // }
};

export default RightMenu;
