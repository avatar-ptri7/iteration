import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Auth.jsx';

function NavLoginPage () {

    const {isAuthenticated} = useAuth();
    console.log('isAuthenticated from navLoginPage.jsx --> ',isAuthenticated)

    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div  className="nav-links">
                <Link to={`/signup`}>Sign Up</Link>
            </div>
        </nav>
    )
}


export default NavLoginPage;