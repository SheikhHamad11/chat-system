import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { data } from '../../global/AgentData'
import axios from 'axios'

const statuses = ["Active", "Deactivate", "Suspend"]

export default function AgentComponent() {
    const [data,setData]=useState([])
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        // setFormData(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_Sever_Api}/Agent`)
          .then((res) => {
            console.log("res", res);
            setData(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }, []);

      
    return (
        <div className="right">
            <div className="container  card shadow border-0 my-3">
                <h1 className='text-center'>Agent Section</h1>
                <div className="d-flex justify-content-between  p-3">
                    <input type="text" onChange={e => setSearch(e.target.value)} className='form-control w-auto' placeholder='Search Here' />
                    <Link to='/AgentForm' className='btn btn-outline-info '>Add New Agent</Link>
                </div>
                
                <div className='table-responsive'>
                    <table className="table table-striped">
                        <thead>
                            <tr className='my-2'>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Email</th>
                                <th scope="col">Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.filter(item => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.firstName.toLowerCase().includes(search)
                                }).map((item, i) => {
                                    return <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.firstName}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.email}</td>
                                        <td>
                                        <select className='form-select' name="" id="" onChange={handleChange}>
                                                {
                                                    statuses.map(status => (
                                                        <option  value={status} key={status}>{status}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td><Link  to={"/agentForm/" + item._id} className='btn btn-outline-warning'>Edit</Link></td>
                                    </tr>
                                })
                            }
                          
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
