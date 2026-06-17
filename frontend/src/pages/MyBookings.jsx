import { useEffect, useState } from "react";
import API from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings found</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="card mb-3 shadow-sm"
          >
            <div className="card-body">
              <h4 className="card-title">
                {booking.service?.title}
              </h4>

              <p className="card-text">
                {booking.service?.description}
              </p>

              <p>
                <strong>Price:</strong> ₹{booking.service?.price}
              </p>

              <span
                className={`badge ${booking.status === "completed"
                    ? "bg-success"
                    : booking.status === "pending"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;