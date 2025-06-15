import React, { useEffect, useState } from "react";
import api from "../api";
import "../style/style.css";
import { Navigate, useNavigate, Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await api.post(
        "api/user/register/",
        {
          first_name: firstname,
          last_name: lastname,
          username: username,
          email: email,
          password1: password1,
          password2: password2,
        },
        { skipAuth: true }
      );
      if (res.status == 201) {
        setLoading(false)
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
 
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            {loading ? <div>Loading...</div>:(
            <h1>TechEvents</h1>
            )}
            <p>Create your account</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="name-container">
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password1}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={password2}
                onChange={(e) => setconfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to={"/login"}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Register;
