import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../common/UserHeader';  // Ensure you have this import

function AddReview() {
    useEffect(() => {
        document.title = 'Reviews';

        return () => {
            document.title = 'Dashboard';
        };
    }, []);

    const navigate = useNavigate();
    
    const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
    let cookieToken = null;

    try {
        if (Token) {
            cookieToken = JSON.parse(Token);
        }
    } catch (e) {
        console.error('Failed to parse token:', e);
    }

    const schema = yup.object().shape({
        bookTitle: yup.string().required('Book title is required'),
        author: yup.string().required('Author is required'),
        reviewText: yup.string().required('Review text is required'),
        rating: yup.number().required('Rating is required').min(1).max(5)
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        if (!cookieToken) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Token is missing or invalid. Please log in again.",
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_GATEWAY_URL}/api/reviews`, data, {
                headers: {
                    Authorization: `Bearer ${cookieToken}`
                  },
            });
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Review added successfully",
                });
                navigate('/dashboard/reviews');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: error.response.data.message
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Something went wrong.",
                });
            }
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content container-fluid">
                <UserHeader title="Reviews" page="reviews" subpage="add" component="user"/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">
                                    Book Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    {...register("bookTitle")}
                                    className="form-control"
                                    type="text"
                                />
                                {errors.bookTitle && (
                                    <span className='text-red-500'>{errors.bookTitle.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">
                                    Author <span className="text-danger">*</span>
                                </label>
                                <input
                                    {...register("author")}
                                    className="form-control"
                                    type="text"
                                />
                                {errors.author && (
                                    <span className='text-red-500'>{errors.author.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="form-group">
                                <label className="col-form-label">
                                    Review Text <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    {...register("reviewText")}
                                    className="form-control"
                                    type="text"
                                />
                                {errors.reviewText && (
                                    <span className='text-red-500'>{errors.reviewText.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-form-label">
                                    Rating <span className="text-danger">*</span>
                                </label>
                                <input
                                    {...register("rating")}
                                    className="form-control"
                                    type="number"
                                    min="1"
                                    max="5"
                                />
                                {errors.rating && (
                                    <span className='text-red-500'>{errors.rating.message}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="submit-section">
                        <button
                            className="btn btn-primary submit-btn"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddReview;
