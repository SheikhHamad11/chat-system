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
  const fetch_client = async (page) => {
    axios
      .get(
        `${
          process.env.REACT_APP_Sever_Api
        }/client?page=${page}&search=${"undefined"}`
      )
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => {
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
  return (
    <div className="right">
      <div className="container w-auto card shadow border-0 my-3">
        <h1 className="text-center">Client Section</h1>
        <div className="d-flex justify-content-between  p-3">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
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
                    : item.companyName.toLowerCase().includes(search);
                })
                .map((item, i) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{i + 1}</th>
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
        <div className="d-flex justify-content-end">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
