import React from 'react';
import {Form, Container} from 'react-bootstrap';
import "../login/login.css";
import "bootstrap";

export default function Login() {
  return (
    <div className="container">
            <div className='login w-100' style={{maxWidth : "350px"}}>
                <h1 className='login-heading'>Log In</h1>
                <Form>
                    <Form.Group id='email' className='form'>
                        <Form.Label >Email</Form.Label>
                        <Form.Control type='email' className='form-el' required />
                    </Form.Group>
                    <br />
                    <Form.Group id='password' className='form'>
                        <Form.Label >Password</Form.Label>
                        <Form.Control type='password' className='form-el' required />
                    </Form.Group>
                    <br />
                    <button className='w-100 mt-4 rounded signup--button' type='submit'>Login</button>
                </Form>
            </div>
        </div>
)};
