import React from 'react'
import UserHeader from './common/UserHeader'
import UserHomeCard from './common/UserHomeCard'
export const HomePage = () => {
  return (
    <>
      {/* Page Content */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <UserHeader title="Welcome!"/>

          <div className="row">
            <div className="col-md-12">
              <div className='row'>
                    <>
                      <UserHomeCard title="Profile" link="profile"/>
                      <UserHomeCard title="Reviews" link="reviews"/>
                    </>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  )
}
