import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const groups = [
    {
        'id': 1, 'name': 'clothing', 'description': "This brand is about clothing"
    },
    {
        'id': 2, 'name': 'cotton', 'description': "This brand is about cotton"
    },
    {
        'id': 3, 'name': 'wood', 'description': "This brand is about wood products"
    }
]
export default function GroupComponent() {
    const [search, setSearch] = useState('')
    const [addedgroups, setaddedGroups] = useState([])
    const [formData, setFormData] = useState({
        'groupName': '',
        'groupDescription': ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = [...groups, { ...formData }]
        setaddedGroups(newData)
        console.log('Form submitted:', formData);
    }

    return (
        <div className='right'>
            <div className="container w-auto card shadow border-0 mt-3">
                <h1 className='text-center'>Group Section</h1>
                <div className="d-flex justify-content-between  p-3">
                    <input type="text" onChange={e => setSearch(e.target.value)} className='form-control w-auto ' placeholder='Search Here' />
                    <button to='/groupForm' className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Group</button>
                </div>
                <div className='table-responsive'>
                    <table className="table table-striped">
                        <thead>
                            <tr className='my-2'>
                                <th scope="col">#</th>
                                <th scope="col">Group Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                groups.filter(group => {
                                    return search.toLowerCase() === ''
                                        ? group
                                        : group.name.toLowerCase().includes(search)
                                }).map((group, i) => {
                                    return <tr key={group.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{group.name}</td>
                                        <td>{group.description}</td>
                                        {/* <td>{group.Industry}</td>
                                        <td>{group.Website_URL}</td> */}
                                        {/* <td>
                                            <select className='form-select' name="" id="" onChange={handleChange}>
                                                {
                                                    statuses.map(status => (
                                                        <option  value={status} key={status}>{status}</option>
                                                    ))
                                                }
                                            </select>

                                        </td> */}
                                        <td><Link to='/addGroup' className='btn btn-outline-warning'>Edit</Link></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Group Form</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div class="modal-body">

                                <div className='col-12'>
                                    <label>Group Name:</label>
                                    <input required className='form-control' type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} />
                                </div>
                                <div className='col-12'>
                                    <label>Group Description:</label>
                                    <input required className='form-control' type="text" name="groupDescription" value={formData.groupDescription} onChange={handleInputChange} />
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit"  class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}


