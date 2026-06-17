import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await API.post("/auth/signup", formData);
      setMessage(res.data.message || "Registration successful! Redirecting to login...");
      
      // Delay navigation slightly to let the user see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center py-5 animate-fade-in" style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)", minHeight: "calc(100vh - 74px)" }}>
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <div className="custom-card shadow-lg bg-white p-4 p-md-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: "48px", height: "48px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C7.883 9.006 6 9 6 9c-3 0-4 1.75-4 4Z"/>
              </svg>
            </div>
            <h2 className="fw-bold mb-1">Create Account</h2>
            <p className="text-secondary small">Join Servify to request or provide expert services</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="text-start">
            {/* Floating Name Input */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingName">Full Name</label>
            </div>

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
            <div className="form-floating mb-3">
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

            {/* Select Role */}
            <div className="form-group mb-4">
              <label className="form-label text-secondary small fw-semibold mb-2">I want to register as:</label>
              <select
                className="form-select py-3"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User (Book Services)</option>
                <option value="provider">Provider (Offer Services)</option>
              </select>
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
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12.146 6.354a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L14.793 10H5.5a.5.5 0 0 1 0-1h9.293l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                    <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 1-.5-.5V2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5v12a.5.5 0 0 0-.5.5H3a.5.5 0 0 1 0-1V2A1.5 1.5 0 0 1 4.5.5h7A1.5 1.5 0 0 1 13 2v5.5a.5.5 0 0 1-.5.5z"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Feedback messages */}
          {message && (
            <div className={`alert text-center p-2 small border-0 mb-3 ${isError ? "alert-danger text-danger" : "alert-success text-success"}`}>
              {message}
            </div>
          )}

          {/* Back to Login */}
          <div className="text-center mt-3">
            <span className="text-muted small">Already have an account? </span>
            <Link to="/login" className="text-primary fw-semibold small text-decoration-none hover-underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;