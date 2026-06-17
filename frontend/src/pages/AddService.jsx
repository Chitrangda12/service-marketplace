import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AddService() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isProvider = user?.role === "provider";

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

    // Form Validation
    if (!formData.title.trim()) {
      setIsError(true);
      setMessage("Please enter a service title.");
      setIsLoading(false);
      return;
    }

    if (Number(formData.price) <= 0 || isNaN(formData.price)) {
      setIsError(true);
      setMessage("Please enter a valid price greater than 0.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
      };

      await API.post("/services", payload);
      setMessage("Service listed successfully! Redirecting to marketplace...");
      
      // Delay navigation to show success state
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to add service");
    } finally {
      setIsLoading(false);
    }
  };

  // Guard: Unauthorized View
  if (!isProvider) {
    return (
      <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center animate-fade-in">
        <div className="custom-card shadow-sm bg-white p-5 text-center" style={{ maxWidth: "550px" }}>
          <div className="mb-4 text-danger opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
          </div>
          <h3 className="fw-bold text-dark mb-2">Access Restrained</h3>
          <p className="text-secondary mb-4">
            Only verified Service Providers are authorized to list new services in the marketplace. Please sign in with a provider account or register as one to proceed.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-custom-primary" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="btn btn-custom-secondary" onClick={() => navigate("/register")}>
              Register as Provider
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center animate-fade-in" style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)", minHeight: "calc(100vh - 74px)" }}>
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="custom-card shadow-lg bg-white p-4 p-md-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: "48px", height: "48px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
            <h2 className="fw-bold mb-1">List New Service</h2>
            <p className="text-secondary small">Fill out the details to publish your service in the public directory</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="text-start">
            {/* Title Input */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small" htmlFor="title">Service Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="e.g. Sofa Cleaning and Sanitization"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price Input */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold small" htmlFor="price">Service Rate (₹)</label>
              <div className="input-group">
                <span className="input-group-text bg-light border text-secondary fw-medium">₹</span>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="e.g. 899"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="form-label text-dark fw-semibold small" htmlFor="description">Detailed Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                placeholder="Describe your service coverage, time duration, equipment you will bring, etc."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-custom-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Listing Service...</span>
                </>
              ) : (
                <>
                  <span>Publish Service</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Feedback messages */}
          {message && (
            <div className={`alert text-center p-2 small border-0 mb-0 ${isError ? "alert-danger text-danger" : "alert-success text-success"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddService;