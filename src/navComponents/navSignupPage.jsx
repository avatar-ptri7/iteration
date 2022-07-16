import React from "react";
import { Link } from "react-router-dom";

function NavSignupPage () {
    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div className="nav-links">
                <Link to={`/login`}>Log In</Link>
            </div>
        </nav>
    )
}


export default NavSignupPage;