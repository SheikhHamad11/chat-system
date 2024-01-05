import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  blurfuction,
  remove_border_color,
  submitvalidation,
} from "../../global/formvalidation";

const initialState = {
  groupName: "",
  groupDescription: "",
};
export default function GroupComponent() {
  const [search, setSearch] = useState("");
  const [error, seterror] = useState({});
  const [addedgroups, setaddedGroups] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const inputRefs = useRef({});
  const navigate = useNavigate();
  // fetching groups data //
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_Sever_Api}/group`)
      .then((result) => {
        setaddedGroups(result.data);
        console.log("res", result);
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
  };

  const SubmitValidation = async () => {
    const keys = Object.keys(inputRefs.current);
    let isValid = true; // Assume all validations pass initially
    let scroll = true;

    for (const item of keys) {
      if (
        item !== "popup" &&
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (await SubmitValidation()) {
  //     console.log("first");
  //     remove_border();
  //     setFormData(initialState);
  //     navigate("/groupsmanagement");
  //     document.getElementById("staticBackdrop").style.background = "none";
  //   }
  //   // localStorage.setItem("agents", JSON.stringify(formData));
  //   // console.log("Form submitted:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await SubmitValidation()) {
      axios
        .post(`${process.env.REACT_APP_Sever_Api}/group`, formData)
        .then((res) => {
          console.log("res", res);
          // inputRefs.current.popup.classList.remove("show");
          // inputRefs.current.popup.style.display = "none";
          // inputRefs.current.popup.setAttribute("data-bs-dismiss", "modal");
          // inputRefs.current.popup.setAttribute("aria-label", "Close");
          inputRefs.current.popup.setAttribute("modal", "hide");
          // e.target.classList.remove("border-success");
          remove_border();
          setaddedGroups((prev) => [res.data, ...prev]);
          setFormData(initialState);

          seterror((prev) => ({ ...prev, general: undefined }));
          navigate("/groupsmanagement");
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

  const setInputRef = (name, ref) => {
    // console.log(name);
    inputRefs.current[name] = ref;
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

  return (
    <div className="right">
      <div className="container w-auto card shadow border-0 mt-3">
        <h1 className="text-center">Group Section</h1>
        <div className="d-flex justify-content-between  p-3">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border ps-2 "
            placeholder="Search Here"
          />
          <button
            to="/groupForm"
            className="btn btn-outline-info"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add New Group
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="my-2">
                <th scope="col">#</th>
                <th scope="col">Group Name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {addedgroups
                .filter((group) => {
                  return search.toLowerCase() === ""
                    ? group
                    : group.groupName.toLowerCase().includes(search);
                })
                .map((group, i) => {
                  return (
                    <tr key={group._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{group.groupName}</td>
                      <td>{group.groupDescription}</td>

                      <td>
                        <Link
                          to="/addGroup"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="btn btn-outline-warning"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        ref={(ref) => setInputRef("popup", ref)}
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Group Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="col-12">
                  <label>Group Name:</label>
                  <input
                    ref={(ref) => setInputRef("groupName", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">{error.groupName}</div>
                </div>
                <div className="col-12">
                  <label>Group Description:</label>
                  <input
                    ref={(ref) => setInputRef("groupDescription", ref)}
                    onBlur={(e) => onblurvalidation(e, "can't be empty!!")}
                    required
                    className="form-control"
                    type="text"
                    name="groupDescription"
                    value={formData.groupDescription}
                    onChange={handleInputChange}
                  />
                  <div className="form-text text-danger">
                    {error.groupDescription}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
