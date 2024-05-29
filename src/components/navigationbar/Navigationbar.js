import React from 'react';
import { Link } from 'react-router-dom';
import './Navigationbar.css';
import logo from '../../images/logo.jpg'
import { logincontext } from '../../contexts/loginContext'
import { useContext } from 'react';

function Navigationbar() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(logincontext)


  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          {/*icon */}
          <a className="navbar-brand" href="#">
            <img src={logo} width="60px" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>


              {/*conditional rendering */}

              {
              !userLoginStatus?(
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              ):(
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={logoutUser}>Logout</Link>
              </li>
              )
              }

              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">AboutUs</Link>
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigationbar;
