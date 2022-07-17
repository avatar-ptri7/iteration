import React from "react";
import { Route, Routes, Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RequireAuth, AuthProvider, useAuth } from './Auth.jsx';
import Layout from './Layout.jsx';
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import User from './User.jsx';
import JobSwipe from "./JobSwipe.jsx";
import NavLoginPage from "./navComponents/navLoginPage.jsx"
import NavSignupPage from "./navComponents/navSignupPage.jsx"


function App() {

  let auth = useAuth();
  console.log('auth from App.jsx --> ',auth)

  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <Routes>
          <Route exact path='login' element={<NavLoginPage />}/>
          <Route path="/*" element={<NavSignupPage />} />
        </Routes>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route exact path='login' element={<Login />} />
            <Route exact path='signup' element={<Signup />} />
            <Route
              exact path='user'
              element={
                <RequireAuth>
                  <User />
                </RequireAuth>
              }
            />
            <Route exact path='job-swipe'
              element={
                <RequireAuth>
                  <JobSwipe />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Bag not secured.</p>
                </main>
              }
            />
          </Route>
        </Routes>
        <Outlet />
      </AuthProvider>
    </DndProvider>
  );
}

export default App;
