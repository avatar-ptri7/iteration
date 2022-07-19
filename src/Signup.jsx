import React from "react";
import Login from './Login.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from './Auth.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import email from "../src/assets/noun-letter-1133125.png"


function Signup() {
  let navigate = useNavigate();
  // let location = useLocation();
  let auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async formData => {

    console.log('Signup form data passed to back-end --> ', formData);

    await axios.post('/auth/signup', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        console.log('Successful Signup request... UserId --> ', response)
        // let userId = response.data;
        // navigate to User page after successful signup
        auth.signin(formData.email, () => {
          navigate('/user', { replace: true });
        })
      })
      .catch(err => console.log('Error in Signup --> ', err))
  }
  // console.log(errors);

  return (
    <div style={styles.container}>
      <div className='signup' style={styles.login}>
        <h1 style={styles.h1}>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input style={styles.email} type="text" placeholder="Email" {...register("email", { required: 'Email is required.', pattern: /^\S+@\S+$/i })} style={styles.inputs} />
          <input type="password" placeholder="Password" {...register("password", { required: 'Password is required.' })} style={styles.inputs} />
          <button type="submit" style={styles.button}>Sign up for free</button>
        </form>
        <div style={styles.signup}>
          <p> <span style={styles.span}>Already a user?</span>
            <Link to='/login'> Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
  },
  login: {
    boxSizing: 'border-box',
    boxShadow: 'rgb(119 118 120 / 35%) 0px 3px 6px',
    borderRadius: '4px',
    padding: '1em',
    margin: '1em auto',
    background: '#eeeeee',
    minWidth: '350px',
    width: '350px',
    maxWidth: '350px',
    color: '#5271ff',
    font: 'Lato'
  },
  form: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center'
  },
  email: {
    backgroundImage: "url('../src/assets/noun-letter-1133125.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '2px 3px',
    textIndent: '17px'
  },
  inputs: {
    display: 'block',
    padding: '1em',
    color: 'rgba(24,0,69,0.7)',
    boxShadow: 'rgb(25 4 69 / 5%) 0px 3px 6px',
    border: '1px solid rgba(25, 4, 69, 0.1)',
    borderRadius: '5px',
    margin: '1em',
    marginBottom: '0',
    font: "'Lato', sans-serif"

  },
  button: {
    backgroundColor: 'rgb(106, 79, 235)',
    color: '#ffffff',
    padding: '0.5em 1em',
    margin: '1em',
    border: '1px solid rgba(0,0,0,0)',
    borderRadius: '5px',
    fontSize: '1em'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  },
  span: {
    color: '#6b6a6a'
  },
  signup: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '0.8em'
  }
}

export default Signup;