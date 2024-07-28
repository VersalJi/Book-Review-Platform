import { UserHeaderMain } from '../../common/UserHeaderMain';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserDeleteModal from '../common/UserDeleteModal';
import DataTable from 'react-data-table-component';
import UserHeader from '../common/UserHeader';
import StarRatings from 'react-star-ratings';  // Import the StarRatings component
import { Tooltip } from 'react-tooltip';  // Import the Tooltip component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function PublicReviews() {
  const pageTitle = 'Reviews';

  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = 'Dashboard';
    };
  }, [pageTitle]);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewModalShow, setViewModalShow] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  const fetchData = async (page, search) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/api/reviews`, {
        params: {
          page,
          search
        }
      });

      if (response.data && response.data.data && Array.isArray(response.data.data.reviews)) {
        setData(response.data.data.reviews);
        setTotalRecords(response.data.data.total); // Set total records count
      } else {
        console.error('Invalid response data:', response.data);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const handleDeleteClick = (deleteData) => {
    setModalShow(true);
    setDeleteModalData(deleteData);
  };

  const handleViewClick = (review) => {
    setCurrentReview(review);
    setViewModalShow(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, searchTerm);
  };

  const handleFilter = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    fetchData(1, search); // Reset to page 1 when searching
  };

  const handleDeleteSuccess = () => {
    fetchData(currentPage, searchTerm);
  };

  const columns = [
    { name: 'S.no', selector: (row, index) => index + 1 + (currentPage - 1) * 10, sortable: true },
    { name: 'Reviewer', selector: row => row.user.username, sortable: true },
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
    {
      name: 'Review',
      selector: row => row.reviewText,
      sortable: true,
      cell: (row) => (
        <div>
          <span
            data-tooltip-id={`review-${row._id}`}
            style={{ cursor: 'pointer' }}
          >
            {row.reviewText.length > 50 ? `${row.reviewText.substring(0, 50)}...` : row.reviewText}
          </span>
          <Tooltip
            id={`review-${row._id}`}
            place="top"
            effect="solid"
          >
            {row.reviewText}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          className="btn btn-link"
          onClick={() => handleViewClick(row)}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <>
      <div className='main-wrapper'> 
        <UserHeaderMain />
        <div className="main-wrapper mt-5">
          <div className="container-fluid py-5">
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
              data={data}
              paginationTotalRows={totalRecords}
              onChangePage={handlePageChange}
              noDataComponent="No records found"
            />
          </div>
        </div>

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
                    <label>Reviewer</label>
                    <p>{currentReview?.user.username}</p>
                  </div>
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
    </>
  );
}

export default PublicReviews;
