import React from "react";
import { Link } from "react-router-dom";

function NavUserPage () {
    return (
        <nav>
            <Link to={`/`}><img src="../assets/logo.png" alt="$ecure the Bag" width="250"/></Link>
            <div className="nav-links">
                <Link to={`/job-swipe`}>Job Swipe</Link>
                <Link to={`/user`}>Job Tracker</Link>
                <Link to={`/signup`}>Sign Out</Link>
            </div>
        </nav>
    )
}


export default NavUserPage;