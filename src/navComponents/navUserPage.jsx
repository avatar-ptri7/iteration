import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Auth.jsx';


function NavUserPage () {

    let auth = useAuth();
    let navigate = useNavigate();
    const onLogout = () => {
        auth.signout(() => {
          navigate('/', { replace: true });
        });
      };

    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div className="nav-links">
                <Link to={`/job-swipe`}>Job Swipe</Link>
                <Link to={`/user`}>Job Tracker</Link>
                <Link to={'/'} onClick={onLogout}>Sign Out</Link>
            </div>
        </nav>
    )
}


export default NavUserPage;