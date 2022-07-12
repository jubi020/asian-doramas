import React from 'react';
import {Form} from 'react-bootstrap';
import "../login/login.css";
import Footer from "../../footer/footer";
import * as Yup from 'yup';
import { registerUser } from '../../../actions/user_actions';
import { useDispatch } from 'react-redux';
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom';

export default function Register(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <Formik
            initialValues={ {email:'', name:'',password:'',confirmPassword:''} }
            validationSchema={
                Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string().email('Invalid email').required('Email is requried'),
                    password: Yup.string().min(8, 'password must be atleast 8 characters long').required('Password is required'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords donot match').required('Password is required')
                })
            }
            onSubmit={function(values, {setSubmitting}){
                setTimeout( () => {
                    let dataToSubmit = {name:values.name ,email:values.email, password:values.password};
                    dispatch( registerUser(dataToSubmit))
                    .then(
                        (res) => {
                            console.log(res.payload);
                            if(res.payload.registerSuccess){
                                alert("successfully registered");
                                console.log(props.history);
                                navigate('/login');

                            }else{
                                alert("Couldn't register, please try again!");
                            }
                        }
                    )
                    setSubmitting(false);
                }, 500 );
            }}
        >
            {   props => {
                    const{values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset} = props;
                    return (
                        <>
                            <div className="container">
                                <div className='login w-100' style={{maxWidth : "390px"}}>
                                    <h1 className='login-heading'>Sign Up</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group id='name' className='form'>
                                            <Form.Label >Name</Form.Label>
                                            <Form.Control type='text'
                                            className={`form-el ${errors.name && touched.name ? 'text-input error':'text-input'}`}
                                            name='name'
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur} required />
                                            {errors.name && touched.name && (<div className='input-feedback'>{errors.name}</div>)}
                                        </Form.Group>
                                        <br />
                                        <Form.Group id='email' className='form'>
                                            <Form.Label >Email</Form.Label>
                                            <Form.Control
                                            id='email'
                                            type='email'
                                            className={`form-el ${errors.email && touched.email?'text-input error':'text-input'}`}
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} required />
                                            {errors.email && touched.email && (<div className='input-feedback'>{errors.email}</div>)}
                                        </Form.Group>
                                        <br />
                                        <Form.Group id='password' className='form'>
                                            <Form.Label >Password</Form.Label>
                                            <Form.Control
                                            type='password'
                                            className={`form-el ${errors.password && touched.password?'text-input error':'text-input'}`}
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur} required />
                                            {errors.password && touched.password && (<div className='input-feedback'>{errors.password}</div>)}
                                        </Form.Group>
                                        <br />
                                        <Form.Group id='confirmPassword' className='form'>
                                            <Form.Label >Confirm Password</Form.Label>
                                            <Form.Control
                                            type='password'
                                            className={`form-el ${errors.confirmPassword && touched.confirmPassword?'text-input error':'text-input'}`}
                                            name='confirmPassword'
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur} required />
                                            {errors.confirmPassword && touched.confirmPassword && (<div className='input-feedback'>{errors.confirmPassword}</div>)}
                                        </Form.Group>
                                        <br />
                                        <button className='w-100 signup--button' type='submit' onClick={handleSubmit} disabled={isSubmitting}>Sign Up</button>
                                        <div className='no_account_div'>
                                          <p> Already have an account! <a href='/login'>Log in</a></p>
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
