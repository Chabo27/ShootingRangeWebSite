import React, { useState } from "react";
import axios from "axios";
import "./Register.css"
import { useHistory } from "react-router-dom"; 

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    img: "",
  });

  // const history = useHistory(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", formData);
      alert("Registracija uspešna !");
      // history.push("/login"); 
    } catch (error) {
      alert("Registracija neuspešna. Pokušaj opet !");
      console.error(error);
    }
  };

  return (
    <div class="container">
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Korisničko ime:</label>
          <input
          className="rInput"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
          className="rInput"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lozinka:</label>
          <input
          className="rInput"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Zemlja:</label>
          <input
          className="rInput"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Grad:</label>
          <input
          className="rInput"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefon:</label>
          <input
          className="rInput"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
