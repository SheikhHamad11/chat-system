import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { countries } from "../../global/Countries";
const designation = ["agent", "sepervisor", "manager"];
const AgentForm = () => {
  const [emailError, setEmailError] = useState("");
  const [loginemailError, setloginEmailError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellNumber: "",
    workingHours: "",
    address: "",
    city: "",
    stateRegion: "",
    zipPostalCode: "",
    country: "",
    designation: "agent",
    loginemail: "",
    logo: "",
    password: "",
  });

  // const getData = () => {
  //     const val = JSON.parse(localStorage.getItem('agents'))
  //     setFormData(val)
  // }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
    }

    if (name === "loginemail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setloginEmailError(emailRegex.test(value) ? "" : "Invalid email address");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      console.log("Form submission failed. Please fix validation errors.");
      return;
    }
    // Send formData to server or perform other actions
    localStorage.setItem("agents", JSON.stringify(formData));
    console.log("Form submitted:", formData);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="right">
        <div className="container">
          <h1 className="my-3 text-center">Agent Form</h1>
          <form onSubmit={handleSubmit} className="card shadow border-0">
            <div className="row m-3">
              <h3>Basic Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>First Name:</label>{" "}
                <input
                  required
                  className="form-control "
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Last Name:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Email:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {/* Email validation error message */}
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Cell#:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="tel"
                  name="cellNumber"
                  value={formData.cellNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Working Hours:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Address:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>City:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>State/Region:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="stateRegion"
                  value={formData.stateRegion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Zip/Postal Code:</label>{" "}
                <input
                  required
                  className="form-control"
                  type="text"
                  name="zipPostalCode"
                  value={formData.zipPostalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Country:</label>
                <select
                  name="country"
                  id="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((country) => (
                    <option value={country.name} key={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {/* <input required className='form-control' type="text" name="country" value={formData.country} onChange={handleInputChange} /> */}
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Designation:</label>
                <select
                  className="form-select"
                  onChange={handleInputChange}
                  name="designation"
                  id="designation"
                >
                  {designation.map((des) => (
                    <option value={des} key={des}>
                      {des}
                    </option>
                  ))}
                </select>
              </div>
              <h3>Login Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Email:</label>
                <input
                  required
                  className="form-control"
                  type="email"
                  name="loginemail"
                  value={formData.loginemail}
                  onChange={handleInputChange}
                />
                {/* Email validation error message */}
                {loginemailError && (
                  <div style={{ color: "red" }}>{loginemailError}</div>
                )}
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Password:</label>
                <input
                  required
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Profile Picture:</label>
                <input
                  required
                  className="form-control"
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <button
                className="btn btn-outline-info mx-auto w-50 my-3"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentForm;
