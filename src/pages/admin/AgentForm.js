import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { countries } from "../../global/Countries";
import {
  blurfuction,
  remove_border_color,
  submitvalidation,
} from "../../global/formvalidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  profilePic: "",
  password: "",
};
const AgentForm = () => {
  const [error, seterror] = useState({});
  const [UploadPercentage, setUploadPercentage] = useState({ logo: 0 });
  const inputRefs = useRef({});
  const [formData, setFormData] = useState(initialState);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     logo: file,
  //   }));
  // };

  const setInputRef = (name, ref) => {
    // console.log(name);
    inputRefs.current[name] = ref;
  };
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

  const SubmitValidation = async () => {
    const keys = Object.keys(inputRefs.current);
    let isValid = true; // Assume all validations pass initially
    let scroll = true;

    for (const item of keys) {
      if (
        !(await submitvalidation(inputRefs.current[item], seterror, formData))
      ) {
        console.log("false:", inputRefs.current[item].name);
        isValid = false;

        if (scroll) {
          scroll = false;
          inputRefs.current[item].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        // No need to continue checking other fields if one fails
      }
    }

    return isValid; // Return the overall validation result
  };

  const remove_border = () => {
    const keys = Object.keys(inputRefs.current);

    keys.forEach((item) => {
      remove_border_color(inputRefs.current[item]);
    });
  };

  const onblurvalidation = (e, msg) => {
    blurfuction(e, msg, seterror, formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await SubmitValidation()) {
      axios
        .post(`${process.env.REACT_APP_Sever_Api}/Agent`, formData)
        .then((res) => {
          console.log("res", res);
          remove_border();
          setFormData(initialState);
          setUploadPercentage({
            logo: 0,
          });
          seterror((prev) => ({ ...prev, general: undefined }));
          navigate("/manageAgent");
        })
        .catch((err) => {
          console.log("err", err);
          window.scrollTo(0, 0);
          seterror((prev) => ({ ...prev, general: err.response.data.message }));
        });
    }
    // localStorage.setItem("agents", JSON.stringify(formData));
    // console.log("Form submitted:", formData);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="right">
        <div className="container">
          <h1 className="my-3 text-center">Agent Form</h1>
          <form onSubmit={handleSubmit} className="card shadow border-0 mb-5">
            <div className="row m-3">
              <h3>Basic Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  First Name:<span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("firstName", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control "
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.firstName}</div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Last Name: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("lastName", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.lastName}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Email: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("email", ref)}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onBlur={(e) =>
                    onblurvalidation(e, "Please Enter a Valid Email Address.")
                  }
                  title="Please Enter a Valid Email Address."
                  required
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.email}</div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Cell#: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("cellNumber", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="tel"
                  name="cellNumber"
                  value={formData.cellNumber}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.cellNumber}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Working Hours: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("workingHours", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">
                  {error.workingHours}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Address: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("address", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.address}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  City: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("city", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.city}</div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  State/Region: <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("stateRegion", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="stateRegion"
                  value={formData.stateRegion}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.stateRegion}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Zip/Postal Code:{" "}
                  <span className="text-danger fw-bold">*</span>
                </label>{" "}
                <input
                  ref={(ref) => setInputRef("zipPostalCode", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  required
                  className="form-control"
                  type="text"
                  name="zipPostalCode"
                  value={formData.zipPostalCode}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">
                  {error.zipPostalCode}
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Country: <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  ref={(ref) => setInputRef("country", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                  name="country"
                  id="country"
                  className="form-select"
                  value={formData.country}
                  required
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((country) => (
                    <option value={country.name} key={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <div className="form-text text-danger">{error.country}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Designation: <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  ref={(ref) => setInputRef("designation", ref)}
                  onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
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
                <div className="form-text text-danger">{error.designation}</div>
              </div>
              <h3>Group Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Groups <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  ref={(ref) => setInputRef("GroupId", ref)}
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
                <div className="form-text text-danger">{error.GroupId}</div>
                {/* <input ref={(ref) => setInputRef('fieldName1', ref)}onBlur={(e) => onblurvalidation(e, "can't be empty!!")}

                 required className='form-control' id='1' type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} /> */}
              </div>
              <h3>Login Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Email: <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  ref={(ref) => setInputRef("loginemail", ref)}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onBlur={(e) =>
                    onblurvalidation(e, "Please Enter a Valid Email Address.")
                  }
                  title="Please Enter a Valid Email Address."
                  required
                  className="form-control"
                  type="email"
                  name="loginemail"
                  value={formData.loginemail}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.loginemail}</div>
              </div>

              {/* <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Password: <span className="text-danger fw-bold">*</span></label>
                <input
                  required
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div> */}

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Password: <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  ref={(ref) => setInputRef("password", ref)}
                  required
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z\d@#$%^&+=!_]{8,}$"
                  onChange={handleInputChange}
                  onBlur={(e) =>
                    onblurvalidation(
                      e,
                      "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (!@#$%^&*()-_+=)."
                    )
                  }
                  title="Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (!@#$%^&*()-_+=)."
                />
                <div className="form-text text-danger">{error.password}</div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>
                  Confirm Password
                  <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  ref={(ref) => setInputRef("CPassword", ref)}
                  onBlur={(e) =>
                    onblurvalidation(
                      e,
                      "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (!@#$%^&*()-_+=)."
                    )
                  }
                  title="Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (!@#$%^&*()-_+=)."
                  required
                  className="form-control"
                  type="password"
                  name="CPassword"
                  value={formData.CPassword}
                  pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z\d@#$%^&+=!_]{8,}$"
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger">{error.CPassword}</div>
              </div>
              {/* <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Profile Picture: <span className="text-danger fw-bold">*</span></label>
                <input
                  required
                  className="form-control"
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <div className="form-text text-danger">
                  {error.profilePic}
                </div>
              </div> */}
              <div className="col-12 ">
                <label>
                  Profile Picture <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  ref={(ref) => setInputRef("profilePic", ref)}
                  className="form-control"
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={
                    UploadPercentage.profilePic > 0 && UploadPercentage < 100
                  }
                  required
                  onBlur={(e) =>
                    onblurvalidation(e, "Please select a profile picture.")
                  }
                  title="Please select a profile picture."
                />
                <div className="form-text text-danger">{error.profilePic}</div>
                {UploadPercentage.profilePic > 0 && (
                  <div
                    className="progress mt-1"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${UploadPercentage.profilePic}%` }}
                    >
                      {/* {console.log(UploadPercentage)} */}
                      {UploadPercentage.profilePic === 100
                        ? "Uploaded Successfully!!"
                        : `${UploadPercentage.profilePic}%`}
                    </div>
                  </div>
                )}
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
