import React from 'react'
import Sidebar from './Sidebar'
import ClientComponent from './ClientComponent'


export default function ManageClient() {
    return (
        <div className='d-flex'>
            <Sidebar />
            <ClientComponent />
        </div>
    )
}
