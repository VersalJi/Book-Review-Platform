import React, { useEffect, useState } from "react";
import "./client-register.css";
import { Link, useNavigate } from "react-router-dom";
import {
  registerRequest,
  registerFailure,
  registerSuccess,
} from "../../../../redux/actions/client_auth_actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserHeaderMain } from "../../common/UserHeaderMain";
import Swal from "sweetalert2";
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputMask from 'react-input-mask';

export const UserRegister = () => {
  const pageTitle = 'Register';
  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = 'Dashboard';
    };
  }, []);
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const clientData = useSelector((state) => state.auth.client);
  const authError = useSelector((state) => state.auth.error);

  const [errors, setErrors] = useState({});
  const [validationErrorsBackend, setValidationErrorsBackend] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Schema Validation
  const schema = yup.object().shape({
    username: yup.string()
      .required("Username is required")
      .matches(/^[A-Za-z][A-Za-z0-9_@.]*$/, "Username should start with an alphabet")
      .min(2, "Username should be more than 2 character")
      .max(24, "Username should not longer than 24 character"),
    email: yup.string()
      .required("Email is required")
      .matches(/^\S+@\S+\.\S+$/, "Please enter valid email")
      .max(50, "Email must be less than 50 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/,
        "Password must contain between 6 and 15 characters, including at least one uppercase letter, one lowercase letter, and one number"
      ),
    cpassword: yup.string()
      .required("Confirm password is required")
      .oneOf([yup.ref('password'), null], 'Password must match')
  });

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleOnchange = async (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    // try {
    //   await schema.validateAt(name, { ...userData, [name]: value });

    //   // If validation passes
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [name]: ""
    //   }));
    // } catch (error) {
    //   // If validation not passes
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [name]: error.message
    //   }));
    // }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      
      // dispatch(registerRequest());
      console.log('userData', userData)
      // await schema.validate(userData, { abortEarly: false });
      const response = await axios.post(
        `${process.env.REACT_APP_GATEWAY_URL}/api/auth/register`,
        userData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Register",
          text: response.data.message,
        });
        dispatch(registerSuccess(response.data));
        // const expirationDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        // const token = JSON.stringify(response.data.token);
        // document.cookie = `token=${token}; path=/; expires=${expirationDate.toUTCString()}`;
        navigate("/login");
      }

      setUserData({
        username: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        dispatch(registerFailure(error));
        const validationErrors = {};
        error.inner.forEach((e) => {
          if (!validationErrors[e.path]) {
            validationErrors[e.path] = e.message;
          }
        });
        setErrors(validationErrors);
      } else if (error.response && error.response.data.validationErrors) {
        dispatch(registerFailure(error.response.data.validationErrors));
        setValidationErrorsBackend(error.response.data.validationErrors);
      } else if (!error.response) {
        dispatch(registerFailure(error));
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: "Something went wrong.",
        });
      } else {
        dispatch(registerFailure(error.response.data.message));
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.response.data.message,
        });
      }
 
    }
  };

  useEffect(() => {}, [clientData]);

  return (
    <div className='main-wrapper'> 
        <UserHeaderMain />
        <div className="main-wrapper mt-5">
    <div className="login-container account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            {isLoading ? (
              <>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden"></span>
              </div>
            </>
            ) : (
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Register</h3>
                  <p className="account-subtitle text-[#1b2b56]">
                    Welcome! Please register yourself
                  </p>
                  <form onSubmit={handleRegister} className="h-[350px] overflow-y-scroll scrollbar-thin">
                    <div className="form-group">
                      <label>Name <span className="text-red-500">*</span></label>
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleOnchange}
                      />
                      {validationErrorsBackend.map((data, index) =>
                        data.path === 'username' && (
                          <span className="text-red-500" key={index}>{data.msg}</span>
                        )
                      )}
                      {errors.username && (
                        <span className="text-red-500">{errors.username}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email <span className="text-red-500">*</span></label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleOnchange}
                      />
                      {validationErrorsBackend.map((data, index) =>
                        data.path === 'email' && (
                          <span className="text-red-500" key={index}>{data.msg}</span>
                        )
                      )}
                      {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                    </div>
                    <div className="form-group relative">
                      <label>Password <span className="text-red-500">*</span></label>
                      <input
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={userData.password}
                        onChange={handleOnchange}
                      />
                      <span className="absolute top-10 right-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </span>
                      {validationErrorsBackend.map((data, index) =>
                        data.path === 'password' && (
                          <span className="text-red-500" key={index}>{data.msg}</span>
                        )
                      )}
                      {errors.password && (
                        <span className="text-red-500">{errors.password}</span>
                      )}
                    </div>
                    <div className="form-group relative">
                      <label>Confirm Password <span className="text-red-500">*</span></label>
                      <input
                        className="form-control"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="cpassword"
                        value={userData.cpassword}
                        onChange={handleOnchange}
                      />
                      <span className="absolute top-10 right-4 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </span>
                      {validationErrorsBackend.map((data, index) =>
                        data.path === 'cpassword' && (
                          <span className="text-red-500" key={index}>{data.msg}</span>
                        )
                      )}
                      {errors.cpassword && (
                        <span className="text-red-500">{errors.cpassword}</span>
                      )}
                    </div>
                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" type="submit">
                        Register
                      </button>
                    </div>
                    <div className="account-footer">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
