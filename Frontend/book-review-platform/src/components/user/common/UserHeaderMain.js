import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/client_auth_actions";

export const UserHeaderMain = () => {
  const data =  useSelector((state) => state.auth.client);
  // const role = data && data.rolesNames && data.rolesNames[0].role_name
  
  // const client = data && data.client ? data.client : null;
  const storedToken = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    
   
      dispatch(logout());
      navigate('/login');

   
    
  };
  return (
    <>
      {/* Header */}
      <div className="header">
        {/* <a id="toggle_btn" href="">
            <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </a> */}
        {/* /Logo */}
        {/* Header Title */}
        <div className="page-title-box float-left">
          <h3>Book Review Platform</h3>
        </div>
        {/* /Header Title */}
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          {/* <li className="nav-item">
            <div className="top-nav-search">
              <a href="javascript:void(0);" className="responsive-search">
                <i className="fa fa-search" />
              </a>
              <form action="search.html">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search here"
                />
                <button className="btn" type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </li> */}
          {/* /Search */}
          {storedToken ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="/reviews" >
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {storedToken ? (
              <>
                {" "}
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="dropdown-item" to="/login">
                  Login
                </Link>
                <Link className="dropdown-item" to="/signup">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
      {/* /Header */}
    </>
  );
};
