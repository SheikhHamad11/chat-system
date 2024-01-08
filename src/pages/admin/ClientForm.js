import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { countries } from "../../global/Countries";
import {
  blurfuction,
  isImage,
  remove_border_color,
  submitvalidation,
} from "../../global/formvalidation";
import { MdClose } from "react-icons/md";
import ProgressLoader from "../../global/ProgressLoader";
const companySizes = ["1-20", "21-50", "50-100", "Above 100"];
const initialState = {
  companyName: "",
  websiteUrl: "",
  subscriptionPackage: "0",
  industry: "",
  companySize: companySizes[0],
  officialPhone: "",
  officialEmail: "",
  officialFax: "",
  address: "",
  city: "",
  stateRegion: "",
  zipPostalCode: "",
  country: "",
  annualRevenue: "",
  logo: "",
  groupId: "",
  primaryEmail: "",
  primaryfirstName: "",
  primarylastName: "",
  primaryjobRole: "",
  primaryphone: "",
  secemail: "",
  secfirstName: "",
  seclastName: "",
  secjobRole: "",
  secphone: "",
  loginemail: "",
  password: "",
  language: "",
  profilePic: "",
  CPassword: "",
};

function ClientForm() {
  const [groups, setGroups] = useState([]);
  const [error, seterror] = useState({});
  const [UploadPercentage, setUploadPercentage] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const { Id } = useParams();
  // console.log(Id);
  const inputRefs = useRef({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  const fetchClient = async (_id) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_Sever_Api}/client/${_id}`
      );
      // console.log(result.data);
      setFormData(result.data);
    } catch (e) {
      console.error(e);
    }
    // const result;
  };
  useEffect(() => {
    if (Id) {
      fetchClient(Id);
    }
  }, [Id]);

  const handleFileChange = (e) => {
    if (isImage(e.target.files[0])) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      // console.log(e.target.files[0]);
      // const imagedata = new FormData();
      // imagedata.append("photo", e.target.files[0]);
      // if (formData[e.target.name]) {
      //   imagedata.append(
      //     "oldpicture",
      //     formData[
      //       Id && e.target.name === "profilePic" ? "displayPic" : e.target.name
      //     ]
      //   );
      // }
      // const url = `${process.env.REACT_APP_Sever_Api}/imageupload`;
      // axios
      //   .post(url, imagedata, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     onUploadProgress: (progressEvent) => {
      //       const percentage = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setUploadPercentage((prev) => ({
      //         ...prev,
      //         [e.target.name]: percentage,
      //       }));
      //     },
      //   })
      //   .then((res) => {
      //     // console.log("res", res.data.path);
      //     seterror((prev) => ({ ...prev, [e.target.name]: "" }));
      //     if (e.target.classList.contains("border-danger")) {
      //       e.target.classList.remove("border-danger");
      //     }
      //     e.target.classList.add("border-success");

      //     setFormData((prevData) => ({
      //       ...prevData,
      //       [e.target.name]: res.data.path,
      //     }));
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //   });
    } else {
      seterror((prev) => ({
        ...prev,
        [e.target.name]: "Only Image is alowed!!",
      }));
      if (e.target.classList.contains("border-success")) {
        e.target.classList.remove("border-success");
      }
      e.target.classList.add("border-danger");
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const onblurvalidation = (e, msg) => {
    blurfuction(e, msg, seterror, formData);
  };

  const SubmitValidation = async () => {
    const keys = Object.keys(inputRefs.current);
    let isValid = true; // Assume all validations pass initially
    let scroll = true;

    for (const item of keys) {
      if (
        !(await submitvalidation(
          inputRefs.current[item],
          seterror,
          formData,
          Id
        ))
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for email validation errors before submitting
    // if (pemailError || semailError || loginemailError) {
    //   console.log("Form submission failed. Please fix validation errors.");
    //   return;
    // }
    if (await SubmitValidation()) {
      if (!Id) {
        const imagedata = new FormData();

        const keys = Object.keys(formData);
        keys.forEach((item) => {
          // console.log(item);
          imagedata.append(item, formData[item]);
        });
        // console.log(imagedata);
        axios
          .post(`${process.env.REACT_APP_Sever_Api}/client`, imagedata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadPercentage(percentage);
            },
          })
          .then((res) => {
            console.log("res", res);

            remove_border();
            setFormData(initialState);
            setUploadPercentage({
              logo: 0,
              profilePic: 0,
            });
            seterror((prev) => ({ ...prev, general: undefined }));
            navigate("/manageClient");
          })
          .catch((err) => {
            console.log("err", err);
            window.scrollTo(0, 0);
            seterror((prev) => ({
              ...prev,
              general: err.response.data.message,
            }));
          });
      } else {
        const imagedata = new FormData();

        const keys = Object.keys(formData);
        keys.forEach((item) => {
          //  console.log(item);
          imagedata.append(item, formData[item]);
        });
        //  console.log(imagedata);
        axios
          .patch(`${process.env.REACT_APP_Sever_Api}/client`, imagedata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadPercentage(percentage);
            },
          })
          .then((res) => {
            console.log("res", res);

            remove_border();
            setFormData(initialState);
            setUploadPercentage({
              logo: 0,
              profilePic: 0,
            });
            seterror((prev) => ({ ...prev, general: undefined }));
            navigate("/manageClient");
          })
          .catch((err) => {
            console.log("err", err);
            window.scrollTo(0, 0);
            seterror((prev) => ({
              ...prev,
              general: err.response.data.message,
            }));
          });
      }
    }
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

  const setInputRef = (name, ref) => {
    // console.log(name);
    inputRefs.current[name] = ref;
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="right position-relative">
          <div className="container">
            <h1 className="text-center mt-2">Client Form</h1>
            <form
              onSubmit={handleSubmit}
              className="card shadow border-0 my-3"
              noValidate
            >
              <div className="row m-3">
                <h3>Basic Info:</h3>
                {error.general && (
                  <h5 className="bg-danger text-center pb-2 rounded text-white d-flex flex-column">
                    <span
                      className="align-self-end"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        seterror((prev) => ({ ...prev, general: undefined }))
                      }
                    >
                      <MdClose />
                    </span>

                    {error.general}
                  </h5>
                )}

                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Company Name <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("companyName", ref)}
                    className="form-control"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                  />
                  <div className="form-text text-danger">
                    {error.companyName}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Website URL <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("websiteUrl", ref)}
                    className="form-control"
                    type="text"
                    name="websiteUrl"
                    value={formData.websiteUrl || formData.websiteURL}
                    onChange={handleInputChange}
                    onBlur={(e) =>
                      onblurvalidation(
                        e,
                        "The website address you entered isn't quite right. Make sure it starts with 'http://' or 'https://' and has a valid website name."
                      )
                    }
                    title="The website address you entered isn't quite right. Make sure it starts with 'http://' or 'https://' and has a valid website name."
                    required
                  />
                  <div className="form-text text-danger">
                    {error.websiteUrl}
                  </div>
                </div>
                {/* <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                <label>Subscription Package: <span className="text-danger fw-bold">*</span></label>
                <input ref={(ref) => setInputRef('subscriptionPackage', ref)}
                  required
                  className="form-control"
                  type="number"
                  name="subscriptionPackage"
                  value={formData.subscriptionPackage}
                  onChange={handleInputChange}
                />
              </div> */}
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Industry <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("industry", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">{error.industry}</div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Company Size <span className="text-danger fw-bold">*</span>
                  </label>
                  <select
                    ref={(ref) => setInputRef("companySize", ref)}
                    className="form-select"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    id=""
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                  >
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <div className="form-text text-danger">
                    {error.companySize}
                  </div>
                  {/* <input ref={(ref) => setInputRef('fieldName1', ref)}onBlur={(e) => onblurvalidation(e, "can't be empty!!")}

                 required className='form-control' type="number" min='1' max='50' name="companySize" value={formData.companySize} onChange={handleInputChange} /> */}
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Official Phone{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("officialPhone", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="tel"
                    name="officialPhone"
                    value={formData.officialPhone}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.officialPhone}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Official Email{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    title="Please Enter a Valid Email Address."
                    required
                    className="form-control"
                    type="email"
                    name="officialEmail"
                    value={formData.officialEmail}
                    onChange={handleInputChange}
                    ref={(ref) => setInputRef("officialEmail", ref)}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onBlur={(e) =>
                      onblurvalidation(e, "Please Enter a Valid Email Address.")
                    }
                  />
                  <div className="form-text text-danger">
                    {error.officialEmail}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Official Fax <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("officialFax", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="officialFax"
                    value={formData.officialFax}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.officialFax}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Address <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("address", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="address"
                    value={formData.address || formData.address1}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">{error.address}</div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    City <span className="text-danger fw-bold">*</span>
                  </label>
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
                    State/Region <span className="text-danger fw-bold">*</span>
                  </label>
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
                  <div className="form-text text-danger">
                    {error.stateRegion}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Zip/Postal Code{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("zipPostalCode", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="number"
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
                    Country <span className="text-danger fw-bold">*</span>
                  </label>
                  <select
                    ref={(ref) => setInputRef("country", ref)}
                    name="country"
                    id="country"
                    className="form-select"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                  >
                    <option value="">-- Select Country --</option>
                    {countries.map((country) => (
                      <option value={country.name} key={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className="form-text text-danger">{error.country}</div>
                  {/* <input required className='form-control' type="text" name="country" value={formData.country} onChange={handleInputChange} /> */}
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Annual Revenue{" "}
                    <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("annualRevenue", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="number"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.annualRevenue}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Logo
                    {Id ? null : <span className="text-danger fw-bold">*</span>}
                  </label>
                  <input
                    ref={(ref) => setInputRef("logo", ref)}
                    onBlur={(e) => onblurvalidation(e, "Please choose a logo!")}
                    title="Please choose a logo!"
                    required={Id ? false : true}
                    className="form-control"
                    type="file"
                    name="logo"
                    // value={formData.logo}
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={
                      UploadPercentage.logo > 0 && UploadPercentage < 100
                    }
                  />
                  <div className="form-text text-danger">{error.logo}</div>
                  {UploadPercentage.logo > 0 && (
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
                        style={{ width: `${UploadPercentage.logo}%` }}
                      >
                        {/* {console.log(UploadPercentage)} */}
                        {UploadPercentage.logo === 100
                          ? "Uploaded Successfully!!"
                          : `${UploadPercentage.logo}%`}
                      </div>
                    </div>
                  )}
                </div>

                <h3>Group Info:</h3>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Groups <span className="text-danger fw-bold">*</span>
                  </label>
                  <select
                    ref={(ref) => setInputRef("GroupId", ref)}
                    name="GroupId"
                    id="groupId"
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

                <h3>Primary Contact Info:</h3>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    First Name <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("primaryfirstName", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="primaryfirstName"
                    value={formData.primaryfirstName}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.primaryfirstName}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Last Name <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("primarylastName", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="primarylastName"
                    value={formData.primarylastName}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.primarylastName}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Email <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("primaryEmail", ref)}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onBlur={(e) =>
                      onblurvalidation(e, "Please Enter a Valid Email Address.")
                    }
                    title="Please Enter a Valid Email Address."
                    required
                    className="form-control"
                    type="email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.primaryEmail}
                  </div>
                  {/* Email validation error message
                {pemailError && (
                  <div style={{ color: "red" }}>{pemailError}</div>
                )} */}
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Job Role <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("primaryjobRole", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="primaryjobRole"
                    value={formData.primaryjobRole}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.primaryjobRole}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Phone <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("primaryphone", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="tel"
                    name="primaryphone"
                    value={formData.primaryphone}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.primaryphone}
                  </div>
                </div>

                <h3>Secondary Contact Info:</h3>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>First Name </label>
                  <input
                    ref={(ref) => setInputRef("secfirstName", ref)}
                    className="form-control"
                    type="text"
                    name="secfirstName"
                    value={formData.secfirstName || formData.secondaryfirstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>Last Name </label>
                  <input
                    ref={(ref) => setInputRef("seclastName", ref)}
                    className="form-control"
                    type="text"
                    name="seclastName"
                    value={formData.seclastName || formData.secondarylastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>Email </label>
                  <input
                    ref={(ref) => setInputRef("secemail", ref)}
                    className="form-control"
                    type="email"
                    name="secemail"
                    value={formData.secemail || formData.secondarymail}
                    onChange={handleInputChange}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    onBlur={(e) =>
                      onblurvalidation(e, "Please Enter a Valid Email Address.")
                    }
                    title="Please Enter a Valid Email Address."
                  />
                  <div className="form-text text-danger">{error.secemail}</div>
                  {/* Email validation error message */}
                  {/* {semailError && (
                  <div style={{ color: "red" }}>{semailError}</div>
                )} */}
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>Job Role </label>
                  <input
                    ref={(ref) => setInputRef("secjobRole", ref)}
                    className="form-control"
                    type="text"
                    name="secjobRole"
                    value={formData.secjobRole || formData.secondaryjobRole}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>Phone </label>
                  <input
                    ref={(ref) => setInputRef("secphone", ref)}
                    className="form-control"
                    type="tel"
                    name="secphone"
                    value={formData.secphone || formData.secondaryphone}
                    onChange={handleInputChange}
                  />
                </div>

                <h3>Login Info:</h3>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Email <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    // ref={(ref) => setInputRef("loginemail", ref)}
                    // onBlur={(e) =>
                    //   onblurvalidation(e, "Please Enter a Valid Email Address.")
                    // }
                    // required
                    className="form-control"
                    type="email"
                    // name="loginemail"
                    value={formData.username || formData.officialEmail}
                    // onChange={handleInputChange}
                    disabled
                  />
                  <div className="form-text text-danger">
                    {error.loginemail}
                  </div>
                  {/* Email validation error message */}
                  {/* {loginemailError && (
                  <div style={{ color: "red" }}>{loginemailError}</div>
                )} */}
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Password{" "}
                    {Id ? null : <span className="text-danger fw-bold">*</span>}
                  </label>
                  <input
                    ref={(ref) => setInputRef("password", ref)}
                    required={Id ? false : true}
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
                    {Id ? null : <span className="text-danger fw-bold">*</span>}
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
                    required={Id && !formData.password ? false : true}
                    className="form-control"
                    type="password"
                    name="CPassword"
                    value={formData.CPassword}
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])[A-Za-z\d@#$%^&+=!_]{8,}$"
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">{error.CPassword}</div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Language <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    ref={(ref) => setInputRef("language", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="language"
                    value={formData.language || formData.primaryLanguage}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">{error.language}</div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
                  <label>
                    Profile Picture{" "}
                    {Id ? null : <span className="text-danger fw-bold">*</span>}
                  </label>
                  <input
                    ref={(ref) => setInputRef("profilePic", ref)}
                    className="form-control"
                    type="file"
                    name="profilePic"
                    onChange={handleFileChange}
                    // value={formData.profilePic || formData.displayPic}s
                    accept="image/*"
                    disabled={
                      UploadPercentage.profilePic > 0 && UploadPercentage < 100
                    }
                    required={Id ? false : true}
                    onBlur={(e) =>
                      onblurvalidation(e, "Please select a profile picture.")
                    }
                    title="Please select a profile picture."
                  />
                  <div className="form-text text-danger">
                    {error.profilePic}
                  </div>
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
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary w-50 mx-auto my-3"
                    type="submit"
                  >
                    {Id ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {UploadPercentage > 0 && UploadPercentage < 100 && (
            <ProgressLoader value={UploadPercentage} />
          )}
        </div>
      </div>
    </>
  );
}

export default ClientForm;
