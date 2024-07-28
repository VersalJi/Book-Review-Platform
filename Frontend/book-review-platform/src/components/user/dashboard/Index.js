import React from 'react'
import { UserContent } from '../common/UserContent'
import { UserHeaderMain } from '../common/UserHeaderMain'
import { UserSidebar } from '../common/UserSidebar'

function UserDashboard() {
  return (
    <div className='main-wrapper'> 
        <UserHeaderMain />
        <UserSidebar />
        <UserContent />
    </div>
  )
}

export default UserDashboard