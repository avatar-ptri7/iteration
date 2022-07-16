import React from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Signup from './Signup.jsx';
import { useAuth } from './Auth.jsx';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();

  let auth = useAuth();



  const onSubmit = async formData => {


    await axios.post('/auth/login', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        // response is the userId --> verifiedId
        console.log('Successful Login request... UserId --> ', response)

        auth.signin(formData.email, () => {
          navigate('/user', { replace: true });
        })
      })
      .catch(err => console.log('Login error --> ', err));
  }
  console.log(errors);

  return (
    <div className='login' style={styles.container}>
      <h1 style={styles.h1}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} style={styles.inputs} />
        <input type="password" placeholder="Password" {...register("password", { required: true })} style={styles.inputs} />

        <input type="submit" value="Login" />
      </form>
<<<<<<< Updated upstream
      <br></br>
      <div style={styles.signup}>
        <p style={styles.p}>New user?</p>
        <Link to='/signup' element={Signup}>Sign up!</Link>
      </div>
=======
      <p style={styles.p}>New user?</p>
      <Link to='/signup' element={Signup} style={{textAlign: 'center', margin: '0 auto'}}>Sign up!</Link>
>>>>>>> Stashed changes
    </div>
  );
}

const styles = {
  container: {
    boxSizing: 'border-box',
    border: '2px solid red',
    borderRadius: '24px',
    padding: '1em',
    margin: '1em auto',
    background: '#fff',
    minWidth: '33vw',
    width: '50vw',
    color: 'dark blue',
    font: 'cascade script'
  },
  form: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputs: {
    border: '1px solid blue',
    padding: '.24em',
    margin: '1em'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  },
  p: {
    textAlign: 'center',
    margin: '0 auto'
  },
  signup: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default Login;