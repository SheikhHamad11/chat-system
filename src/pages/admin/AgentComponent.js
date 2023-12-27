import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { data } from '../../global/AgentData'

const statuses = ["Active", "Deactivate", "Suspend"]

export default function AgentComponent() {
    const [search, setSearch] = useState('')
    const handleChange = (e) => {
        // setFormData(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    return (
        <div className="right">
            <div className="container card shadow border-0 mt-3">
                <h1 className='text-center'>Agent Section</h1>
                <div className="d-flex justify-content-between  p-3">
                    <input type="text" onChange={e => setSearch(e.target.value)} className='form-control w-25' placeholder='Search Here' />
                    <Link to='/AgentForm' className='btn btn-outline-info '>Add New Agent</Link>
                </div>
                <div className='table-responsive'>
                    <table className="table table-striped">
                        <thead>
                            <tr className='my-2'>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.filter(item => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.first_name.toLowerCase().includes(search)
                                }).map((item, i) => {
                                    return <tr key={item.Id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
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
                                        <td><Link to='/agentForm' className='btn btn-outline-warning'>Edit</Link></td>
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
