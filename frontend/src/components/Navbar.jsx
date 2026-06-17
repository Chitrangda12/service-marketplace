import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Service Marketplace
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link" to="/">
            Home
          </Link>

          {!user && (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link className="nav-link" to="/bookings">
                Bookings
              </Link>

              <Link className="nav-link" to="/add-service">
                Add Service
              </Link>

              <button
                className="btn btn-danger ms-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;