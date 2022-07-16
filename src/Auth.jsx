import React, { useState, createContext, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { authProvider } from './authProvider.js';

// interface AuthContextType {
//   user: any;
//   signin: (user: string, callback: VoidFunction) => void;
//   signout: (callback: VoidFunction) => void;
// }

// generate default context
let AuthContext = createContext({user: null});
// let AuthContext = createContext();

function AuthProvider({ children }) {
  console.log('AuthProvider was called')

  let [user, setUser] = useState(null);

  // used in Login.jsx for post request to /auth/login and Signup.jsx for post request auth/signup, callback navigates to new endpoint
  let signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  // signout functionality not yet implemented
  let signout = (callback) => {
    setUser(null);
    callback();
  };

  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value} user={user}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  console.log('useAuth was called --> ',useContext(AuthContext))
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

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
