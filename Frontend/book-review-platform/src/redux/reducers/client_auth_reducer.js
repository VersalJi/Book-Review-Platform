// reducers/authReducer.js
// Action Types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const LOGOUT = 'LOGOUT';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

// Initial State
const initialState = {
  clientAuthenticated: false,
  client: null,
  loading: false,
  error: null,
};

// Reducer
const clientAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        clientAuthenticated: true,
        client: action.payload,
        loading: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        clientAuthenticated: false,
        client: null,
        loading: false,
        error: action.payload,
      };

    // Logout
    case LOGOUT:
      // Remove the token from the cookie
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Reset the state to initialState
      return initialState;

    // Register
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        clientAuthenticated: true,
        client: action.payload,
        loading: false,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        clientAuthenticated: false,
        client: null,
        loading: false,
        error: action.payload,
      };

    // Forgot Password
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        // Handle success logic if needed
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default clientAuthReducer;
