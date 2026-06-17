import { useState } from "react";
import API from "../api/axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);
      setMessage(res.data.message);
    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <br /><br />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="provider">Provider</option>
        </select>
        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Register;