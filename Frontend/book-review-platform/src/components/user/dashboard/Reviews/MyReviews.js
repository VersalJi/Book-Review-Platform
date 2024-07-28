import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import UserHeader from '../common/UserHeader'; // Import UserHeader component
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteReview, setDeleteReview] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false); // Added for view modal
  const [currentReview, setCurrentReview] = useState(null);

  // Retrieve token from cookies
  const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  let cookieToken = null;
  if (Token && Token !== 'undefined') {
    try {
      cookieToken = JSON.parse(Token);
    } catch (e) {
      console.error('Error parsing token:', e);
    }
  }

  const fetchReviews = async (page, search) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/api/reviews/my`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`
        },
        params: {
          page,
          search,
        }
      });

      if (response.data && response.data.data && Array.isArray(response.data.data.reviews)) {
        setReviews(response.data.data.reviews);
        setTotalRecords(response.data.data.total); // Set total records count
      } else {
        console.error('Invalid response data:', response.data);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchReviews(page, searchTerm);
  };

  const handleFilter = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    fetchReviews(1, search); // Reset to page 1 when searching
  };

  const handleDeleteClick = (review) => {
    setModalShow(true);
    setDeleteReview(review);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/api/reviews/delete/${deleteReview._id}`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`
        }
      });
      setModalShow(false);
      fetchReviews(currentPage, searchTerm);
    } catch (e) {
      console.error('Error deleting review:', e);
    }
  };

  const handleEditClick = (review) => {
    setCurrentReview(review);
    setEditModalShow(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleEditConfirm = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_GATEWAY_URL}/api/reviews/update/${currentReview._id}`, currentReview, {
        headers: {
          Authorization: `Bearer ${cookieToken}`
        }
      });
      setEditModalShow(false);
      Swal.fire('Success', 'Review updated successfully', 'success');
      fetchReviews(currentPage, searchTerm);
    } catch (e) {
      console.error('Error updating review:', e);
    }
  };

  const handleViewClick = (review) => {
    setCurrentReview(review);
    setViewModalShow(true);
  };

  const columns = [
    { name: 'S.no', selector: (row, index) => index + 1 + (currentPage - 1) * 10, sortable: true },
    { name: 'Reviewer', selector: row => row.user.username, sortable: true }, // Added Reviewer column
    { name: 'Book Title', selector: row => row.bookTitle, sortable: true },
    { name: 'Author', selector: row => row.author, sortable: true },
    {
      name: 'Rating',
      selector: row => row.rating,
      sortable: true,
      cell: (row) => (
        <StarRatings
          rating={row.rating}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
        />
      )
    },
    { name: 'Review', selector: row => row.reviewText, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-around">
          <FontAwesomeIcon
            icon={faEye}
            className="text-info"
            style={{ cursor: 'pointer' }}
            onClick={() => handleViewClick(row)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            className="text-warning"
            style={{ cursor: 'pointer' }}
            onClick={() => handleEditClick(row)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDeleteClick(row)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <UserHeader title="Reviews" />
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={handleFilter}
                placeholder="Search by Book Title"
              />
              <label className="focus-label">Book Title</label>
            </div>
          </div>
        </div>

        <DataTable
          pagination
          columns={columns}
          data={reviews}
          paginationTotalRows={totalRecords}
          onChangePage={handlePageChange}
          noDataComponent="No records found"
        />

        {/* Modal for Delete Confirmation */}
        {modalShow && (
          <div className="modal show" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="close" onClick={() => setModalShow(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this review?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Editing Review */}
        {editModalShow && (
          <div className="modal show" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Review</h5>
                  <button type="button" className="close" onClick={() => setEditModalShow(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Book Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="bookTitle"
                        value={currentReview?.bookTitle || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Author</label>
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={currentReview?.author || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <input
                        type="number"
                        className="form-control"
                        name="rating"
                        min="1"
                        max="5"
                        value={currentReview?.rating || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Review Text</label>
                      <textarea
                        className="form-control"
                        name="reviewText"
                        value={currentReview?.reviewText || ''}
                        onChange={handleEditChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditModalShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditConfirm}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Viewing Review */}
        {viewModalShow && (
          <div className="modal show" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">View Review</h5>
                  <button type="button" className="close" onClick={() => setViewModalShow(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Book Title</label>
                    <p>{currentReview?.bookTitle}</p>
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <p>{currentReview?.author}</p>
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <StarRatings
                      rating={currentReview?.rating || 0}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                  <div className="form-group">
                    <label>Review Text</label>
                    <p>{currentReview?.reviewText}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setViewModalShow(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReviews;
