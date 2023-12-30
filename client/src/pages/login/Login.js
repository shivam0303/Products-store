import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });


  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(credentials)
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("http://localhost:8080/user/login", credentials, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // console.log(res.data);
          
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // console.log("login success");s
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };



  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;