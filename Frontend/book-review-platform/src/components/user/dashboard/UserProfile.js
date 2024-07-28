import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserHeader from "./common/UserHeader";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { loginSuccess } from "../../../redux/actions/client_auth_actions"; // import the action

// User profile component
export const UserProfile = () => {

  // Get basic data of user from redux
  const data = useSelector((state) => state.auth.client);
  const dispatch = useDispatch();

  // Get token from cookie
  const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  let cookieToken = null;
  if (Token) {
    cookieToken = JSON.parse(Token);
  }

  // State
  const client = data && data.user ? data.user : null;
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(client?.username || '');
  const [email, setEmail] = useState(client?.email || '');

  // Header
  const pageTitle = "Profile";
  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Dashboard";
    };
  }, []);

  const handleEditClick = () => {
    if (client) {
      setUsername(client.username);
      setEmail(client.email);
    }
    setShowModal(true);
  };

  // Handle form submission for updating user info
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_GATEWAY_URL}/api/auth/update`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Dispatch login success action
        dispatch(loginSuccess(response.data.user));

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Profile updated successfully!',
        });

        setShowModal(false);
      }
    } catch (e) {
      console.log(e);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile',
        text: 'Something went wrong.',
      });
    }
  };

  // Re-fetch user data when the Redux store updates
  useEffect(() => {
    if (data && data.user) {
      setUsername(data.user.username);
      setEmail(data.user.email);
    }
  }, [data]);

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <UserHeader title="Profile" page="profile" component="hrms" />
          {/* /Page Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <ul className="personal-info">
                              <li>
                                <div className="title">Name:</div>
                                <div className="text">
                                  {username}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Email:</div>
                              <div className="text">
                                {email}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        to="#"
                        onClick={handleEditClick}
                        className="edit-icon"
                      >
                        <i className="fa fa-pencil" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      
      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};



