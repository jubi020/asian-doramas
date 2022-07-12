import React, {useState} from 'react';
import axios from 'axios';
import { useSelector} from "react-redux";
import { useNavigate} from 'react-router-dom';
import {Button, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


function RightMenu(props){

    // const [isAuth, setIsAuth] = useState(false);

    let user = useSelector(state => state.user);
    // setIsAuth(user.userData && !user.userData.isAuth);
    // console.log("user in rightmenu is ", user);
    const user_server = '/api/users';
    const navigate = useNavigate();

    const logoutHandler = () => {
        axios.get(`${user_server}/logout`).then(res => {
            if(res.status === 200){
              window.localStorage.removeItem('userId');
            //   setIsAuth(false);
                window.location.reload(true);
                navigate('/');
            }else{
                alert('logout failed');
            }
        });
    };

    if(user.userData && !user.userData.isAuth){
        return (
            <>
                <Button type='button' className='btn btn-success'><a href='/register' style={{textDecoration:"none", color:"black"}}>Sign Up</a></Button>
                <Button type='button' className='btn btn-success' style={{marginLeft:'10px'}}><a href='/login' style={{textDecoration:"none", color:"black"}}>Log in</a></Button>
            </>
        );
    }
    else{
        return(
            <>
                <Button onClick={logoutHandler}>Log out</Button>
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
