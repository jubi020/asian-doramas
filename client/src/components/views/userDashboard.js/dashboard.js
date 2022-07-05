import React from 'react';
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


export default function Dashboard(props){

    function handleLogout(){
        console.log("logout button pressed");
    }

    return (
        <>
        <div style={{display:"flex", justifyContent:"flex-end", margin:"20px 0"}}>
           <Button onClick={handleLogout}>Log Out</Button> 
        </div>
        <h1>welcome to the dashboard user</h1>
        </>
    );
}