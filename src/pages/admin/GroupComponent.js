import axios from 'axios'
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
        axios.post('http://192.168.60.116:5000/api/group', formData)
            .then((res) => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('err', err)
            })

        let newData = [...groups, { ...formData }]
        setaddedGroups(newData)
        console.log('Form submitted:', formData);
    }

    return (
        <div className='right'>
            <div className="container w-auto card shadow border-0 mt-3">
                <h1 className='text-center'>Group Section</h1>
                <div className="d-flex justify-content-between  p-3">
                    <input type="text" onChange={e => setSearch(e.target.value)} className='form-control w-25' placeholder='Search Here' />
                    <button to='/groupForm' className='btn btn-outline-info w-25' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add New Group</button>
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
                    
                                        <td><Link to='/addGroup' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='btn btn-outline-warning'>Edit</Link></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Group Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="modal-body">

                                <div className='col-12'>
                                    <label>Group Name:</label>
                                    <input required className='form-control' type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} />
                                </div>
                                <div className='col-12'>
                                    <label>Group Description:</label>
                                    <input required className='form-control' type="text" name="groupDescription" value={formData.groupDescription} onChange={handleInputChange} />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}


