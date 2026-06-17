import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [clientBookings, setClientBookings] = useState([]);
  const [providerBookings, setProviderBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("client"); // "client" or "provider"
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.role === "provider";

  const fetchClientBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setClientBookings(res.data);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  };

  const fetchProviderBookings = async () => {
    if (!isProvider) return;
    try {
      const res = await API.get("/bookings/provider");
      setProviderBookings(res.data);
    } catch (error) {
      console.error("Error fetching provider bookings:", error);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    await Promise.all([fetchClientBookings(), fetchProviderBookings()]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    setActionLoadingId(bookingId);
    try {
      await API.put(`/bookings/${bookingId}`, { status: newStatus });
      alert(`Booking status updated to ${newStatus}!`);
      await fetchProviderBookings(); // Refresh provider bookings list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="badge bg-success-subtle text-success badge-custom">Completed</span>;
      case "accepted":
        return <span className="badge bg-info-subtle text-info badge-custom text-dark">Accepted</span>;
      case "pending":
      default:
        return <span className="badge bg-warning-subtle text-warning badge-custom text-dark">Pending</span>;
    }
  };

  return (
    <div className="container py-5 flex-grow-1 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-start">
          {/* Header */}
          <div className="mb-4">
            <h1 className="fw-bold mb-1">Booking Dashboard</h1>
            <p className="text-secondary">Track your service schedule and review status updates.</p>
          </div>

          {/* Provider Tabs */}
          {isProvider && (
            <div className="mb-4">
              <ul className="nav nav-pills bg-white p-1 rounded-3 border shadow-sm">
                <li className="nav-item col text-center">
                  <button
                    className={`nav-link w-100 fw-semibold py-2.5 transition-smooth ${activeTab === "client" ? "active bg-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("client")}
                  >
                    My Bookings (Ordered)
                  </button>
                </li>
                <li className="nav-item col text-center">
                  <button
                    className={`nav-link w-100 fw-semibold py-2.5 transition-smooth ${activeTab === "provider" ? "active bg-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("provider")}
                  >
                    Received Bookings (Jobs)
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Loader State */}
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading bookings...</span>
              </div>
              <p className="text-secondary mt-2">Loading your schedule...</p>
            </div>
          ) : (
            <div>
              {/* Client Bookings List */}
              {activeTab === "client" && (
                <div>
                  {clientBookings.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 border shadow-sm p-4">
                      <div className="mb-3 text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                      </div>
                      <h4 className="fw-bold text-dark">No bookings ordered yet</h4>
                      <p className="text-secondary">Explore services on the home page and book your first appointment!</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {clientBookings.map((booking) => (
                        <div key={booking._id} className="col-12">
                          <div className="custom-card p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div>
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="small text-muted fw-semibold">ORDER ID: {booking._id.substring(18).toUpperCase()}</span>
                                {getStatusBadge(booking.status)}
                              </div>
                              <h4 className="fw-bold text-dark mb-1">{booking.service?.title || "Deleted Service"}</h4>
                              <p className="text-secondary mb-2" style={{ fontSize: "0.92rem" }}>
                                {booking.service?.description || "This service is no longer available."}
                              </p>
                              <div className="d-flex flex-wrap gap-3 text-muted small">
                                <span>
                                  <strong>Price:</strong> ₹{booking.service?.price}
                                </span>
                                <span>
                                  <strong>Date:</strong> {new Date(booking.date || booking.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Provider Received Bookings List */}
              {activeTab === "provider" && isProvider && (
                <div>
                  {providerBookings.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 border shadow-sm p-4">
                      <div className="mb-3 text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                      </div>
                      <h4 className="fw-bold text-dark">No received bookings</h4>
                      <p className="text-secondary">You haven't received any service requests from clients yet.</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {providerBookings.map((booking) => (
                        <div key={booking._id} className="col-12">
                          <div className="custom-card p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="small text-muted fw-semibold">JOB ID: {booking._id.substring(18).toUpperCase()}</span>
                                {getStatusBadge(booking.status)}
                              </div>
                              <h4 className="fw-bold text-dark mb-1">{booking.service?.title}</h4>
                              
                              {/* Client Details */}
                              <div className="bg-light p-2.5 rounded-3 mb-2.5 border" style={{ maxWidth: "450px" }}>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "20px", height: "20px", fontSize: "0.65rem" }}>
                                    {booking.user?.name ? booking.user.name.charAt(0).toUpperCase() : "C"}
                                  </div>
                                  <span className="fw-semibold text-dark small">{booking.user?.name || "Client"}</span>
                                </div>
                                <span className="text-muted small d-block">{booking.user?.email}</span>
                              </div>

                              <div className="d-flex flex-wrap gap-3 text-muted small">
                                <span>
                                  <strong>Payout:</strong> ₹{booking.service?.price}
                                </span>
                                <span>
                                  <strong>Request Date:</strong> {new Date(booking.date || booking.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Provider Action Buttons */}
                            <div className="d-flex flex-column gap-2 flex-shrink-0 align-items-stretch" style={{ minWidth: "160px" }}>
                              {booking.status === "pending" && (
                                <button
                                  className="btn btn-custom-primary w-100 btn-sm py-2"
                                  onClick={() => handleUpdateStatus(booking._id, "accepted")}
                                  disabled={actionLoadingId === booking._id}
                                >
                                  {actionLoadingId === booking._id ? "Accepting..." : "Accept Request"}
                                </button>
                              )}
                              {booking.status === "accepted" && (
                                <button
                                  className="btn btn-success btn-sm w-100 py-2 border-0 fw-semibold text-white"
                                  style={{ backgroundColor: "#2ec4b6" }}
                                  onClick={() => handleUpdateStatus(booking._id, "completed")}
                                  disabled={actionLoadingId === booking._id}
                                >
                                  {actionLoadingId === booking._id ? "Completing..." : "Complete Service"}
                                </button>
                              )}
                              {booking.status === "completed" && (
                                <div className="text-center text-success fw-bold small p-2 rounded bg-success-subtle">
                                  ✓ Job Completed
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;