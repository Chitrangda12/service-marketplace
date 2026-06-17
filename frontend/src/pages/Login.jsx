import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful! Redirecting...");
      
      // Delay redirect slightly to show success state
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center py-5 animate-fade-in" style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)", minHeight: "calc(100vh - 74px)" }}>
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <div className="custom-card shadow-lg bg-white p-4 p-md-5">
          {/* Logo / Brand */}
          <div className="text-center mb-4">
            <div className="bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: "48px", height: "48px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </div>
            <h2 className="fw-bold mb-1">Welcome Back</h2>
            <p className="text-secondary small">Log in to manage your bookings and services</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="text-start">
            {/* Floating Email Input */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            {/* Floating Password Input */}
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-custom-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Messages feedback */}
          {message && (
            <div className={`alert text-center p-2 small border-0 mb-3 ${isError ? "alert-danger text-danger" : "alert-success text-success"}`}>
              {message}
            </div>
          )}

          {/* Link to Register */}
          <div className="text-center mt-3">
            <span className="text-muted small">Don't have an account? </span>
            <Link to="/register" className="text-primary fw-semibold small text-decoration-none hover-underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;