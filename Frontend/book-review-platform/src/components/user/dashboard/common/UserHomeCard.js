import React from 'react'
import { Link } from 'react-router-dom'

import PersonIcon from '@mui/icons-material/Person';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import Settings from '@mui/icons-material/Settings';

function UserHomeCard({ title, link }) {

    return (
        <div className="col-md-4 align-items-center text-center">
            <Link to={`/dashboard/${link}`} className='no-underline'>
                <div className="card">
                    <div className="card-body">
                        <span className="dash-widget-icon flex items-center justify-center">

                            {
                                title === 'Profile' ?
                                    <PersonIcon style={{ fontSize: 40 }} />
                                    : title === 'Reviews' ?
                                        <RateReviewOutlinedIcon style={{ fontSize: 40 }} />
                                         : null
                            }
                        </span>

                        <h3 className="card-title mt-3">{title}</h3>
                        <div id="bar-charts" />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UserHomeCard