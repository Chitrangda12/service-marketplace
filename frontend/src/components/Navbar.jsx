import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top py-3 px-4 transition-smooth">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-3" style={{ width: "38px", height: "38px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.167 3.583a.5.5 0 0 0 .466 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 3.5h3v-.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5z"/>
              <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8 10.85a1 1 0 0 1-.928 0L0 6.85z"/>
            </svg>
          </div>
          <span className="fw-bold fs-4 text-gradient font-heading" style={{ letterSpacing: "-0.5px" }}>Servify</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2 shadow-none"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 transition-smooth ${
                  isActive("/") ? "bg-primary-light text-primary" : "text-secondary"
                }`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 transition-smooth ${
                      isActive("/login") ? "bg-primary-light text-primary" : "text-secondary"
                    }`}
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <span>Login</span>
                  </Link>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link
                    className="btn btn-custom-primary w-100 py-2 px-4 d-flex align-items-center justify-content-center gap-2"
                    to="/register"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C7.883 9.006 6 9 6 9c-3 0-4 1.75-4 4Z"/>
                    </svg>
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 transition-smooth ${
                      isActive("/bookings") ? "bg-primary-light text-primary" : "text-secondary"
                    }`}
                    to="/bookings"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.545a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    <span>Bookings</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 py-2 rounded-3 fw-medium d-flex align-items-center gap-2 transition-smooth ${
                      isActive("/add-service") ? "bg-primary-light text-primary" : "text-secondary"
                    }`}
                    to="/add-service"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    <span>Add Service</span>
                  </Link>
                </li>

                {/* Profile indicator and Logout */}
                <li className="nav-item ms-lg-3 mt-3 mt-lg-0 border-top pt-3 pt-lg-0 border-lg-0 d-flex align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-2 px-2">
                    <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="d-flex flex-column text-start">
                      <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: "100px", fontSize: "0.85rem" }}>{user.name}</span>
                      <span className="text-muted fw-medium text-capitalize" style={{ fontSize: "0.7rem" }}>{user.role}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1"
                    onClick={handleLogout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;