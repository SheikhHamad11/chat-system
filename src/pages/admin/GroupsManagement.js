import React from 'react'
import Sidebar from './Sidebar'
import GroupComponent from './GroupComponent'

export default function GroupsManagement() {
    return (
        <div className='d-flex'>
            <Sidebar />
            <GroupComponent />
        </div>
    )
}
