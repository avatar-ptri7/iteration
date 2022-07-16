import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Auth.jsx';

function NavLoginPage (props) {

    const auth = useAuth()

    // useEffect(() => {
    //   console.log('auth.user from navLoginPage.jsx --> ',auth.user);
    // });
    
    let navigate = useNavigate();
    const onLogout = () => {
        auth.signout(() => {
            navigate('/', { replace: true });
        });
    };

    const links = [];
    if (auth.user) {
        links.push(<Link to={`/job-swipe`} key={0}>Job Swipe</Link>,
        <Link to={`/user`} key={1}>Job Tracker</Link>,
        <Link to={'/'} key={2} onClick={onLogout}>Sign Out</Link>)
    }
    else links.push(<Link to={`/signup`} key={0}>Sign Up</Link>)

    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div  className="nav-links">
                {links}
            </div>
        </nav>
    )
}


export default NavLoginPage;