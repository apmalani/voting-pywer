import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#ECECEC'}}>
    <div className="container-fluid align-items-center">
        <Link to="/voting-pywer" className="navbar-brand">Voting Pywer</Link>
        
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="navbar-item" >
                    <Link className="nav-link" to="/about">About</Link>
                </li>
            </ul>
            
            <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Settings
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Print</a></li>
                        <li><a className="dropdown-item" href="#">Report Issue</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
    )
}

export default HeaderComponent;