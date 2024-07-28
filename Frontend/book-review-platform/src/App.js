// import logo from "./logo.svg";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useDispatch} from "react-redux";
import { loginSuccess, logout } from "./redux/actions/client_auth_actions";

function App() {
  const dispatch = useDispatch();
  const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  let cookieToken = null;
  if (Token && Token !== 'undefined') {
    try {
      cookieToken = JSON.parse(Token);
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }

  useEffect(() => {
    if (Token != null) {
      (async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/api/auth/fetch_detail`, {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
            },
          });
          
          if (response.status === 200) {
            console.log('here')
            dispatch(loginSuccess(response.data));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(logout());
        }
      })();
    }
  }, []);
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
