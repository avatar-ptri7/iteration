import React from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from './Auth.jsx';

function Login() {

  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  let auth = useAuth();



  const onSubmit = async formData => {


    await axios.post('/auth/login', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        // response is the userId --> verifiedId
        console.log('Successful Login request!')

        auth.signin(response.data, () => {
          navigate('/user', { replace: true });
        })
      })
      .catch(err => console.log('Login error --> ', err));
  }
  // console.log(errors);

  return (
    <div style={styles.container}>
      <div className='login' style={styles.login}>
        <h1 style={styles.h1}>Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <input type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} style={styles.inputs} />
          <input type="password" placeholder="Password" {...register("password", { required: true })} style={styles.inputs} />

          <button type="submit" style={styles.button}>Continue</button>
        </form>
        <div style={styles.signup}>
          <p><span style={styles.span}>Don't have an account?</span> <Link to='/signup'>Sign up!</Link></p>
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
    height: '100vh'
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
};

export default Login;