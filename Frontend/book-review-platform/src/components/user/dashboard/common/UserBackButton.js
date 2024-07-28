import React from 'react'
import { Link } from 'react-router-dom'

function UserBackButton({ title }) {

   

    return (
        <div className="col-auto float-right ml-auto mt-4">
            {
                 title === 'employees' ? (
                    <Link to= '../employee'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>       
                ): title === 'attendance' ? (
                    <Link to='../attendance'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'profile' ? (
                    <Link to= '../profile'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'leaves' ? (
                    <Link to= '../leaves'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'employee-leaves' ? (
                    <Link to= '../employee-leaves'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'assets' ? (
                    <Link to= '../assets'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'main-category' ? (
                    <Link to= '../main-category'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'sub-category' ? (
                    <Link to= '../sub-category'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'locations' ? (
                    <Link to= '../locations'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'attendance-summary' ? (
                    <Link to= '../attendance-summary'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'feedback' ? (
                    <Link to= '../feedback'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'holidays' ? (
                    <Link to= '../holidays'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'careers' ? (
                    <Link to= '../careers'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'referrals' ? (
                    <Link to= '../careers/referrals'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'employee-referrals' ? (
                    <Link to= '../careers/employee-referrals'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'cities' ? (
                    <Link to= '../cities'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'departments' ? (
                    <Link to= '../departments'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):title === 'designations' ? (
                    <Link to= '../designations'>
                        <button className='btn add-btn'>
                            <i className='fa fa-angle-left' /> Back
                        </button>
                    </Link>
                ):null
        }




        </div>
    )
}

export default UserBackButton