import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginRequest,
  loginFailure,
  loginSuccess,
} from "../../../../redux/actions/client_auth_actions";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './user-login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserHeaderMain } from "../../common/UserHeaderMain";
import * as yup from 'yup'



export const UserLogin = () => {
  const pageTitle = 'Login'
  useEffect(() => {
    document.title = pageTitle

    return () => {
      document.title = 'Dashboard'
    }
  }, []);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrorsBackend, setValidationErrorsBackend] = useState([])

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(/^\S+@\S+\.\S+$/, "Please enter valid email")
      .required("Email is required")
      .max(50,"Email must be less than 50 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/,
        "Password must contain between 6 and 15 characters, including at least one uppercase letter, one lowercase letter, and one number"
      )
  });
  
  const [errors, setErrors] = useState({});
  // const [isBlur, setIsBlur] = useState(false);
  

  const handleOnchange = async (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    // try {
    //   await schema.validateAt(name, {[name]: value})

    //   //if Validation Passes
    //   setErrors(prevError => ({
    //     ...prevError,
    //     [name]: "",
    //   }))
    // } catch (error) {
    //   // If Validation Fail
    //   setErrors(prevError => ({
    //     ...prevError,
    //     [name]: error.message,
    //     }))
    // }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginRequest());
      // await schema.validate(credentials, {abortEarly:false})
      const response = await axios.post(
        `${process.env.REACT_APP_GATEWAY_URL}/api/auth/login`,
        credentials
      );


      // Assuming your server returns a token on successful login
      // const token = response.data.token;
      // // Dispatch the success action and store the token in your Redux state
      dispatch(loginSuccess(response.data));
      console.log('response', response.data)
      // const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 15 minutes
      const token = JSON.stringify(response.data.user.token);
      // document.cookie = `token=${token}; secure=true; path=/; expires=${expirationDate.toUTCString()}`;
      document.cookie = `token=${token}; path=/; SameSite=Lax`;
      navigate("/dashboard/home");

      // You might want to redirect the user to another page or perform additional actions here
    } catch (error) {
      // console.log(error)
      // Dispatch the failure action with the error message
      if (error instanceof yup.ValidationError) {
        // console.log(e)
        dispatch(loginFailure(error))
        const validationErrors = {};
        error.inner.forEach((e) => {
           
          if (!validationErrors[e.path]) {
            validationErrors[e.path] = e.message;
          }
              
            
        });
        
        setErrors(validationErrors);
    }
    // console.log(error)
   else if(error.response?.data?.validationErrors){
      dispatch(loginFailure(error))
      setValidationErrorsBackend(error.response?.data?.validationErrors)
    }
    else if (!error.response) {
      console.log('error', error)
        dispatch(loginFailure(error));
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong.",
        });
      } else {
        dispatch(loginFailure(error.response.data.message));
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      }
      // dispatch(loginFailure(error.response));
    

      // You might want to show an error message to the user or perform other actions on failure
    }
  };

  return (
    <>
      {/* Main Wrapper */}
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
                <>
                  <div className="account-box">
                    <div className="account-wrapper">
                      <h3 className="account-title">Login</h3>
                      <p className="account-subtitle text-[#1b2b56]">
                        Welcome! Please login to your account
                      </p>
                      
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <label>Email Address<span className="text-red-500"> *</span></label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={credentials.email}
                            onChange={handleOnchange}
                          />
                          {
                            validationErrorsBackend.length > 0 && (
                              validationErrorsBackend.map((data, index)=>{
                                if(data?.path === 'email'){
                                  return <div key={index} className="text-red-500">{data?.msg}</div>
                                }
                              })
                            )
                          }
                          {
                            errors.email && (
                              <span className="text-red-500">{errors.email}</span>
                            )
                          }
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label>Password <span className="text-red-500">*</span></label>
                            </div>
                            <div className="col-auto">
                              <Link className="text-muted" to="#">
                                Forgot password?
                              </Link>
                            </div>
                          </div>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={credentials.password}
                              onChange={handleOnchange}
                            />
                           
                            <div className="input-group-append">
                              <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </span>
                            </div>
                          </div>
                          {
                            validationErrorsBackend.length > 0 && (
                              validationErrorsBackend.map((data, index)=>{
                                if(data?.path === 'password'){
                                  return <div key={index} className="text-red-500">{data?.msg}</div>
                                }
                              })
                            )
                          }
                          {
                            errors.password && (
                              <span className="text-red-500">{errors.password}</span>
                              )
                          }
                        </div>
                        <div className="form-group text-center">
                          <button className="btn btn-primary account-btn" type="submit">
                            Login
                          </button>
                        </div>
                        <div className="account-footer">
                          <p>
                            Don't have an account yet? <Link to="/register">Register</Link>
                          </p>
                        </div> 
                      </form>
                      {/* /Account Form */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};
