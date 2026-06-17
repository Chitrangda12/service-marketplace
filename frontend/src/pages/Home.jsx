import { useEffect, useState } from "react";
import API from "../api/axios";

function Home() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleBook = async (serviceId) => {
    try {
      const res = await API.post("/bookings", {
        serviceId: serviceId,
      });

      alert("Service booked successfully!");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };
  return (
    <div className="container-fluid mt-4 px-4">
      <h1 className="text-center mb-4">
        Available Services
      </h1>

      {services.length === 0 ? (
        <p className="text-center">
          No services available
        </p>
      ) : (
        services.map((service) => (
          <div
            key={service._id}
            className="card shadow-sm mb-3"
          >
            <div className="card-body">
              <h4 className="card-title">
                {service.title}
              </h4>

              <p className="card-text">
                {service.description}
              </p>

              <p>
                <strong>Price:</strong> ₹{service.price}
              </p>

              <p>
                <strong>Provider:</strong>{" "}
                {service.provider?.name}
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  handleBook(service._id)
                }
              >
                Book Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;