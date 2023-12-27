import React from 'react'
import client from '../../images/client.png'
import agent from '../../images/agent.png'
import svg from '../../images/logo-icon-black.svg'

import group from '../../images/groups.png'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="left d-flex flex-column bg-light">
            <div className='logo m-3'>
                <Link to='/'><img src={svg} className='w-100 '  alt="" /></Link>
            </div>

            <div className='client-img m-3'>
                <Link to='/manageClient'><img src={client} className='w-100' alt="" /></Link>
            </div>

            <div className='agent-img m-3'>
                <Link to='/manageAgent'><img src={agent} className='w-100' alt="" /></Link>
            </div>

            <div className='group-img m-3'>
                <Link to='/groupsmanagement'><img src={group} className='w-100 ' alt="" /></Link>
            </div>
        </div>
    )
}
