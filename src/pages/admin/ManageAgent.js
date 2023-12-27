import React from 'react'

import Sidebar from './Sidebar'
import AgentComponent from './AgentComponent'

export default function ManageAgent() {
    return (
        <div className='d-flex'>
            <Sidebar />
            <AgentComponent />
        </div>
    )
}
