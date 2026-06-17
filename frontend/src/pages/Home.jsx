import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Home() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingLoadingId, setBookingLoadingId] = useState(null);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const fetchServices = async () => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [isLoggedIn]);

  const handleBook = async (serviceId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setBookingLoadingId(serviceId);
    try {
      await API.post("/bookings", {
        serviceId: serviceId,
      });
      alert("Service booked successfully! You can track it in the Bookings dashboard.");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoadingId(null);
    }
  };

  // Filter services by search query
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pb-5">
      {/* Hero Section */}
      <div className="bg-white py-5 mb-5 border-bottom">
        <div className="container py-4">
          <div className="row align-items-center justify-content-between g-5">
            <div className="col-lg-7 text-start animate-fade-in">
              <span className="badge bg-primary-light text-primary px-3 py-2 rounded-pill fw-bold mb-3">
                📍 Verified On-Demand Services
              </span>
              <h1 className="display-4 fw-extrabold mb-3" style={{ lineHeight: "1.2" }}>
                Find Local Professionals <br />
                <span className="text-gradient">For Your Home & Business</span>
              </h1>
              <p className="text-secondary fs-5 mb-4" style={{ maxWidth: "600px" }}>
                Connect with local service providers to schedule cleaning, electrical work, plumbing, maintenance, and professional tasks through a simple booking system.
              </p>
              
              {!isLoggedIn && (
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-custom-primary px-4 py-2.5" onClick={() => navigate("/register")}>
                    Get Started
                  </button>
                  <button className="btn btn-custom-secondary px-4 py-2.5" onClick={() => navigate("/login")}>
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Decorative Vector Graphic (SVG) */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="p-4 bg-primary-light rounded-4 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="text-primary opacity-75" viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1.5 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3zm0-1.5A1.5 1.5 0 0 0 0 9v3a1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 6 12V9a1.5 1.5 0 0 0-1.5-1.5h-3zm10.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3zm0-1.5A1.5 1.5 0 0 0 9 9v3a1.5 1.5 0 0 0 1.5 1.5h3A1.5 1.5 0 0 0 15 12V9a1.5 1.5 0 0 0-1.5-1.5h-3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Marketplace Section */}
        {!isLoggedIn ? (
          /* Guest Catalog Restricted State */
          <div className="custom-card shadow-sm bg-white p-5 text-center mx-auto" style={{ maxWidth: "600px" }}>
            <div className="mb-4 text-primary opacity-75">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 1v3H3v-3h3zM3 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3zm7 1v3H7v-3h3zM7 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H7zm-4 7v3H0V7h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H0zm7 1v3H4V7h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4zm7 1v3H8V7h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H8zm4-6v3h-3V1h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-3zm3 7v3h-3V7h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3zm-9 6v3H0v-3h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H0zm7 1v3H4v-3h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H4zm7 1v3H8v-3h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H8zm4-6v3h-3V7h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3zm3 7v3h-3v-3h3zm-3-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3z"/>
              </svg>
            </div>
            <h4 className="fw-bold text-dark mb-2">Sign In to Explore Services</h4>
            <p className="text-secondary mb-4">
              To guarantee service provider verification and booking security, browsing our live service catalog requires authentication. Sign in to your account to get started.
            </p>
            <button className="btn btn-custom-primary px-5 py-2.5" onClick={() => navigate("/login")}>
              Log In to Browse
            </button>
          </div>
        ) : (
          /* Logged In Real Services View */
          <div>
            {/* List Header & Search */}
            <div className="row justify-content-between align-items-center mb-4 g-3">
              <div className="col-md-6 text-start">
                <h2 className="fw-bold mb-1">Available Services</h2>
                <p className="text-muted mb-0">Browse and book active listings from our verified network.</p>
              </div>
              <div className="col-md-5">
                <div className="input-group shadow-sm rounded-3 overflow-hidden border">
                  <span className="input-group-text bg-white border-0 pe-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 py-2 ps-2 shadow-none"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Services Load Grid */}
            {isLoading ? (
              <div className="row g-4 mt-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="col-md-6 col-lg-4">
                    <div className="custom-card p-4">
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text" style={{ width: "90%" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "80%" }}></div>
                      <div className="skeleton skeleton-text" style={{ width: "40%", marginTop: "1rem" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-5 my-4 custom-card bg-white p-5 max-width-md mx-auto" style={{ maxWidth: "550px" }}>
                <div className="mb-4 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.01.388-1.01.94z"/>
                  </svg>
                </div>
                <h4 className="fw-bold text-dark mb-2">No Services Available</h4>
                <p className="text-secondary mb-4">
                  {searchQuery 
                    ? `No listings match your search for "${searchQuery}".` 
                    : "No services have been listed in the database yet. Click \"Add Service\" in the menu to create the first listing!"}
                </p>
                {searchQuery && (
                  <button className="btn btn-custom-secondary" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 animate-fade-in">
                {filteredServices.map((service) => (
                  <div key={service._id} className="col">
                    <div className="custom-card h-100 d-flex flex-column text-start">
                      <div className="p-4 flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="badge bg-primary-light text-primary badge-custom fw-semibold px-2 py-1">
                            ₹{service.price}
                          </span>
                          <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: "0.8rem" }}>
                            <div className="bg-light text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold border" style={{ width: "24px", height: "24px", fontSize: "0.7rem" }}>
                              {service.provider?.name ? service.provider.name.charAt(0).toUpperCase() : "P"}
                            </div>
                            <span className="fw-medium text-truncate" style={{ maxWidth: "120px" }}>{service.provider?.name || "Provider"}</span>
                          </div>
                        </div>

                        <h4 className="card-title fw-bold text-dark mb-2">{service.title}</h4>
                        <p className="card-text text-secondary mb-3" style={{ fontSize: "0.92rem", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {service.description || "No description provided."}
                        </p>
                      </div>

                      <div className="px-4 pb-4 pt-0 mt-auto">
                        <button
                          className="btn btn-custom-primary w-100 d-flex align-items-center justify-content-center gap-2"
                          onClick={() => handleBook(service._id)}
                          disabled={bookingLoadingId === service._id}
                        >
                          {bookingLoadingId === service._id ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span>Booking...</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.545a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                              </svg>
                              <span>Book Now</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;