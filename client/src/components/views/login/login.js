import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import "./login.css";
import Footer from "../../footer/footer";
import NavBar from "../../navbar/navbar";
import {loginUser} from "../../../actions/user_actions";
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Login(props) {

    const [formErrorMessage ,setFormErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
            <Formik
                initialValues={
                    {
                        email: '',
                        password: ''
                    }
                }
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string().email('Email is invalid').required('Email is required'),
                        password: Yup.string().min(8, 'Password must be atleast 8 characters long').required('Password is required'),
                    })
                }
                onSubmit={function(values, { setSubmitting }){
                    setTimeout( () => {
                            let dataToSubmit = {
                                email: values.email,
                                password: values.password
                            };
                            dispatch(loginUser(dataToSubmit))
                            .then(res => {
                                if(res.payload.loginSuccess){
                                  window.localStorage.setItem('userId', res.payload.userId);

                                    // console.log("response of loginuser in login.js", res.payload);
                                    navigate("/");
                                }else{
                                    setFormErrorMessage('Check your password and email again')
                                }
                            }).catch(err => {
                                setFormErrorMessage('Email or password do not match. Please try again!')
                                setTimeout( () => {
                                    setFormErrorMessage("")}, 5000);
                                });
                                setSubmitting(false);
                            }, 500);
                        }
                }
            >
            {
                props => {
                    const {values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset,} = props;
                    return (
                        <>
                            <NavBar />
                            <div className="container">
                                <div className='login w-100' style={{ maxWidth: "350px" }}>
                                    <h1 className='login-heading'>Log In</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group id='email' className='form'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type='email'
                                            className={`form-el ${errors.email && touched.email ? 'text-input error' : 'text-input'} `}
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required />
                                            {errors.email && touched.email && (<div className='input-feedback'>{errors.email}</div>)}
                                        </Form.Group>
                                        <br />
                                        <Form.Group id='password' className='form'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type='password'
                                            className={`form-el ${errors.password && touched.password ? 'text-input error':'text-input'}`}
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required />
                                            {errors.password && touched.password && <div className='input-feedback'>{errors.password}</div>}
                                        </Form.Group>
                                        <br />
                                        <button className='w-100 signup--button' type='submit'>Login</button>

                                        <div className='no_account_div'>
                                        <p>Don't have an account! <a href="/register">Signup</a></p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <Footer />
                        </>
                    )
                }
            }
        </Formik>
    );
};

export default (Login);
