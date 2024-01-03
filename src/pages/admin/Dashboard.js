import React from 'react'
// import ManageClient from './ManageClient'
// import ManageAgent from './ManageAgent'
import Sidebar from './Sidebar'
// import ClientComponent from './ClientComponent'
// import AgentComponent from './AgentComponent'
// import {Link} from 'react-router-dom'
export default function Dashboard() {
    return (
        <div className='dashboard d-flex'>
            <Sidebar />
            <div className="right">
                <h1 className='text-center my-2'>Admin Dashboard</h1>
               
            </div>
        </div>
    )
}
