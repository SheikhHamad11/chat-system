import React, { useEffect, useState } from 'react'
import { data } from '../../global/ClientData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const statuses = ["Active", "Deactivate", "Suspend"]
export default function ClientComponent() {
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(res => {
                console.log('res', res)
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [])

    const handleChange = (e) => {
        // setFormData(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    return (
        <div className="right">

            <div className="container w-auto card shadow border-0 my-3">
                <h1 className='text-center'>Client Section</h1>
                <div className="d-flex justify-content-between  p-3">
                    <input type="text" onChange={e => setSearch(e.target.value)} className='form-control w-auto ' placeholder='Search Here' />
                    <Link to='/clientForm' className='btn btn-outline-info '>Add New Client</Link>
                </div>
                
                <div className='table-responsive'>
               
                    <table className="table table-striped">
                        <thead>
                            <tr className='my-2'>
                                <th scope="col">#</th>
                                <th scope="col">Comapany Name</th>
                                <th scope="col">Industry</th>
                                <th scope="col">Website URL</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.filter(item => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.company_Name.toLowerCase().includes(search)
                                }).map((item, i) => {
                                    return <tr key={item.Id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.company_Name}</td>
                                        <td>{item.Industry}</td>
                                        <td>{item.Website_URL}</td>
                                        <td>
                                            <select className='form-select' name="" id="" onChange={handleChange}>
                                                {
                                                    statuses.map(status => (
                                                        <option value={status} key={status}>{status}</option>
                                                    ))
                                                }
                                            </select>

                                        </td>
                                        <td><Link to={'/clientForm/'+item.Id} className='btn btn-outline-warning'>Edit</Link></td>
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
