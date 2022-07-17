import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Auth.jsx';

function NavSignupPage () {

    const auth = useAuth()
    
    let navigate = useNavigate();

    const onLogout = () => {

        auth.signout(() => {
            navigate('/', { replace: true });
        });

        axios.post('/auth/signout')
            .then(response => {
                console.log('Successful Signout request...')
            })
            .catch(err => console.log('Signout error --> ', err));
    };

    const links = [];
    if (auth.user) {
        links.push(<Link to={`/job-swipe`} key={0}>Job Swipe</Link>,
        <Link to={`/user`} key={1}>Job Tracker</Link>,
        <Link to={'/'} key={2} onClick={onLogout}>Sign Out</Link>)
    }
    else links.push(<Link to={`/login`} key={0}>Log In</Link>)

    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div className="nav-links">
                {links}
            </div>
        </nav>
    )
}


export default NavSignupPage;