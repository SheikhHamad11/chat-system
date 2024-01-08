import React, { useEffect, useState } from "react";
// import { data } from '../../global/ClientData'
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../../components/Pagination";

const statuses = [
  { name: "Active", value: 1 },
  { name: "Deactivate", value: 0 },
  { name: "Suspend", value: 2 },
];
export default function ClientComponent() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalclient, settotalclient] = useState(0);
  const [typingTimer, setTypingTimer] = useState(null);
  const delay = 1000;
  const [loading, setloading] = useState(false);
  const [tab, settab] = useState(1);
  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [typingTimer]);
  const fetch_client = async (page, searchterm) => {
    settab(page);
    axios
      .get(
        `${process.env.REACT_APP_Sever_Api}/client?page=${page}&search=${searchterm}`
      )
      .then((res) => {
        console.log("res", res);
        console.log(loading);
        setloading(false);
        setData(res.data.clientdata);
        if (res.data.totalCount) {
          settotalclient(res.data.totalCount);
        }
      })
      .catch((err) => {
        setloading(false);
        console.log("err", err);
      });
  };
  useEffect(() => {
    fetch_client(1);
  }, []);

  const handleChange = async (e, _id, index) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_Sever_Api}/ClientStatus`,
        { [e.target.name]: e.target.value, _id }
      );
      //   console.log(result);
      const temp = [...data];
      temp[index] = result.data;
      setData(temp);
    } catch (e) {
      console.log(e);
    }
    // setFormData(s => ({ ...s, [e.target.name]: e.target.value }))
  };
  const handlesearch = (e) => {
    setSearch(e.target.value);
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    console.log(loading);
    if (!loading) setloading(true);

    // Set a new timer
    setTypingTimer(
      setTimeout(() => {
        // Trigger search after the delay
        fetch_client(1, e.target.value);
      }, delay)
    );
  };
  const handlepagechange = (page) => {
    fetch_client(page, search);
  };
  return (
    <div className="right">
      <div className="container w-auto card shadow border-0 my-3">
        <h1 className="text-center">Client Section</h1>
        <div className="d-flex justify-content-between  p-3">
          <input
            type="text"
            onChange={(e) => handlesearch(e)}
            className="form-control w-auto "
            placeholder="Search Here"
          />
          <Link to="/clientForm" className="btn btn-outline-info ">
            Add New Client
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr className="my-2">
                <th scope="col">#</th>
                <th scope="col">Comapany Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Website URL</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.companyName
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase());
                })
                .map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{(tab - 1) * 20 + i + 1}</th>
                      <td>{item.companyName}</td>
                      <td>{item.industry}</td>
                      <td>{item.websiteURL}</td>
                      <td>
                        <select
                          className="form-select"
                          name="Status"
                          value={item.isActive}
                          id=""
                          onChange={(e) => handleChange(e, item._id, i)}
                        >
                          {statuses.map((status) => (
                            <option value={status.value} key={status.value}>
                              {status.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <Link
                          to={"/clientForm/" + item._id}
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
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <Pagination
            totalclient={totalclient}
            handlepagechange={handlepagechange}
          />
        </div>
      </div>
    </div>
  );
}
