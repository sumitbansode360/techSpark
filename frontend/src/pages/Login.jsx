import React, { useEffect, useState } from "react";
import api from "../api";
import "../style/style.css";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(
        "api/token/",
        {
          username: username,
          password: password,
        },
        { skipAuth: true }
      );
      if (res.status == 200) {
        setLoading(false);
        const data = await res.data;
        localStorage.setItem("ACCESS_TOKEN", data.access);
        localStorage.setItem("REFRESH_TOKEN", data.refresh);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="auth-container">
    
        <div className="auth-card">
          <div className="auth-header">
          {loading ? <div className=""><h3>Loading...</h3></div> :(
            <h1>TechSpark</h1>
          )}
            <p>Sign in to your account</p>
          </div>
          
          <form className="auth-form" onSubmit={handleLogin} method="post">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to={"/register"}>Sign up</Link>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Login;
