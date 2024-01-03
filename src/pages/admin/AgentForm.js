import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { countries } from "../../global/Countries";
import axios from "axios";
const designation = ["agent", "sepervisor", "manager"];
const initialState = {
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
};
const AgentForm = () => {
  const [emailError, setEmailError] = useState("");
  const [loginemailError, setloginEmailError] = useState("");
  const [groups, setGroups] = useState([]);
  const [error, seterror] = useState({});
  const [UploadPercentage, setUploadPercentage] = useState({
    logo: 0,
    profilePic: 0,
  });
  const inputRefs = useRef({});
  const [formData, setFormData] = useState(initialState);

  // const getData = () => {
  //     const val = JSON.parse(localStorage.getItem('agents'))
  //     setFormData(val)
  // }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_Sever_Api}/group`)
      .then((result) => {
        setGroups(result.data);
        setFormData((prev) => ({ ...prev, GroupId: result.data[0]._id }));
        // console.log("res", result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
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
    const imagedata = new FormData();
    imagedata.append("photo", e.target.files[0]);
    if (formData[e.target.name]) {
      imagedata.append("oldpicture", formData[e.target.name]);
    }
    const url = `${process.env.REACT_APP_Sever_Api}/imageupload`;
    axios
      .post(url, imagedata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadPercentage((prev) => ({
            ...prev,
            [e.target.name]: percentage,
          }));
        },
      })
      .then((res) => {
        // console.log("res", res.data.path);
        seterror((prev) => ({ ...prev, [e.target.name]: "" }));
        if (e.target.classList.contains("border-danger")) {
          e.target.classList.remove("border-danger");
        }
        e.target.classList.add("border-success");

        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: res.data.path,
        }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_Sever_Api}/Agent`, formData)
      .then((res) => {
        console.log("res", res);

        // remove_border();
        setFormData(initialState);
        // setUploadPercentage({
        //   logo: 0,
        //   profilePic: 0,
        // });
        // seterror((prev) => ({ ...prev, general: undefined }));
        // navigate("/manageClient");
      })
      .catch((err) => {
        console.log("err", err);
        window.scrollTo(0, 0);
        // seterror((prev) => ({ ...prev, general: err.response.data.message }));
      });
    // if (emailError) {
    //   console.log("Form submission failed. Please fix validation errors.");
    //   return;
    // }
    // // Send formData to server or perform other actions
    // localStorage.setItem("agents", JSON.stringify(formData));
    // console.log("Form submitted:", formData);
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
                  id=""
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((country) => (
                    <option value={country} key={country.code}>
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
                  id=""
                >
                  {designation.map((des) => (
                    <option value={des} key={des}>
                      {des}
                    </option>
                  ))}
                </select>
              </div>
              <h3>Group Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Groups <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  // ref={(ref) => setInputRef("GroupId", ref)}
                  name="GroupId"
                  id=""
                  className="form-select"
                  onChange={handleInputChange}
                >
                  {groups.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.groupName}
                    </option>
                  ))}
                </select>
                {/* <div className="form-text text-danger">{error.GroupId}</div> */}
                {/* <input ref={(ref) => setInputRef('fieldName1', ref)}onBlur={(e) => onblurvalidation(e, "can't be empty!!")}

                 required className='form-control' id='1' type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} /> */}
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
