import React, { useState, createContext, useContext, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

// generate default context
let AuthContext = createContext({user: null});
// let AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  
  // used in Login.jsx for post request to /auth/login and Signup.jsx for post request auth/signup, callback navigates to new endpoint
  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };
  
  const signout = (callback) => {
    setUser(null);
    callback();
  };
  
  const verify = (currUser, callback) => {
    setUser(currUser)
    callback();
  }
  
  let value = { user, signin, signout, verify };

  return (
    <AuthContext.Provider value={value} user={user}>
      {children}
    </AuthContext.Provider>
  );
}


function RequireAuth({ children }) {

  let auth = useAuth();
  let location = useLocation();
  let navigate = useNavigate();

  // check verify session on reload
  const loadUser = async () => {
    await axios.post('/auth/verify')
    .then(response => {
      // response is the userId --> verifiedId
      console.log('Successful verify request!')
      
      auth.verify(response.data, () => {
        navigate(location.pathname, { replace: true });
      })
    })
    .catch(err => console.log('Unsuccessful Verify request--please log in'));
  };
  useEffect(() => {loadUser()},[])

  // if auth.user doesn't exist yet (aka not logged in), will Navigate to Login page
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log('Login to view your user dashboard!');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // if auth.user exists, will return User page
  return children;
}

export { useAuth, RequireAuth, AuthProvider };
