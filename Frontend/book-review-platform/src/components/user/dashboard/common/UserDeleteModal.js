import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';


const UserDeletModal = (props) => {
  //   const [permissionId, setPermissionId] = useState('');
  //   const [roleId, setRoleId] = useState('')
  //   const [groupId, setGroupId] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [educationDataId, setEducationDataId] = useState('')
  const [experienceDataId, setExperienceDataId] = useState('')
  const [feedbackId, setFeedbackId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [locationId, setLocationId] = useState('')
  const [assetId, setAssetId] = useState('')
  const [holidayId, setHolidayId] = useState('')
  const [careerId, setCareerId] = useState('')
  const [referralId, setReferralId] = useState('')
  const [cityId, setCityId] = useState('')
  const [designationId, setDesignationId] = useState('')
  const [departmentId, setDepartmentId] = useState('')

  const clientdata = useSelector((state) => state.auth.client);
  const Token = (document.cookie.match(/(?:^|; )token=([^;]*)/) || [])[1];
  let cookieToken = null;
  if (Token) {
    cookieToken = JSON.parse(Token);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    props.hide()

    if (props.title === 'Employees') {
      try {

        const response = await axios.delete(
          `${process.env.REACT_APP_GATEWAY_URL}/user/delete_user/${employeeId}`, {
          headers: {
            token: cookieToken
          }
        }
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Deleted Successfully",
          });
          setEmployeeId('')

          if (props.onSuccess) {
            props.onSuccess()
          }

        }

        // You might want to redirect the user to another page or perform additional actions here
      } catch (error) {
        // Dispatch the failure action with the error message
        if (!error.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: error.response.data.message,
          });
        }
        setEmployeeId('')

        // You might want to show an error message to the user or perform other actions on failure
      }
    }
    else if (props.title === 'Cities') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/cities/delete_city/${cityId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "City Deleted successfully",
          });
          setCityId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setCityId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Designations') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/designations/delete_designation/${designationId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Designation Deleted successfully",
          });
          setDesignationId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setDesignationId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Departments') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/departments/delete_department/${departmentId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Departments Deleted successfully",
          });
          setDepartmentId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setDepartmentId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Education Data') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/user/education-info/delete/${educationDataId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Education Info Deleted successfully",
          });
          setEducationDataId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setEducationDataId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if(props.title === 'Holidays'){
      try {
  
        const response = await axios.delete(
          `${process.env.REACT_APP_GATEWAY_URL}/holidays/delete/${holidayId}`, {
            headers:{
              token: cookieToken
            }
          }
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Holiday Deleted Successfully",
          });
          setHolidayId('')
         
          if(props.onSuccess){
            props.onSuccess()
          }
          
        }
  
        // You might want to redirect the user to another page or perform additional actions here
      } catch (error) {
        // Dispatch the failure action with the error message
        if (!error.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: error.response.data.message,
          });
        }
        setHolidayId('')
        
        // You might want to show an error message to the user or perform other actions on failure
      }}

      else if(props.title === 'Careers'){
        try {
    
          const response = await axios.delete(
            `${process.env.REACT_APP_GATEWAY_URL}/careers/delete/${careerId}`, {
              headers:{
                token: cookieToken
              }
            }
          );
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Careers Deleted Successfully",
            });
            setCareerId('')
           
            if(props.onSuccess){
              props.onSuccess()
            }
            
          }
    
          // You might want to redirect the user to another page or perform additional actions here
        } catch (error) {
          // Dispatch the failure action with the error message
          if (!error.response) {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "Some thing went wrong.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: error.response.data.message,
            });
          }
          setCareerId('')
          
          // You might want to show an error message to the user or perform other actions on failure
        }}  

        else if(props.title === 'Referrals'){
          try {
      
            const response = await axios.delete(
              `${process.env.REACT_APP_GATEWAY_URL}/referrals/delete/${referralId}`, {
                headers:{
                  token: cookieToken
                }
              }
            );
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Referrals Deleted Successfully",
              });
              setReferralId('')
             
              if(props.onSuccess){
                props.onSuccess()
              }
              
            }
      
            // You might want to redirect the user to another page or perform additional actions here
          } catch (error) {
            // Dispatch the failure action with the error message
            if (!error.response) {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "Some thing went wrong.",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.response.data.message,
              });
            }
            setReferralId('')
            
            // You might want to show an error message to the user or perform other actions on failure
          }} 

    else if (props.title === 'Category') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/asset-main-category/delete_category/${categoryId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data?.message,
          });
          setCategoryId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setCategoryId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Sub Category') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/asset-sub-category/delete_category/${subCategoryId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data?.message,
          });
          setSubCategoryId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setSubCategoryId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Locations') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/locations/delete/${locationId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data?.message,
          });
          setLocationId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setLocationId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }
    else if (props.title === 'Assets') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/assets/delete/${assetId}`, {
          headers: {
            token: cookieToken
          }
        });
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data?.message,
          });
          setAssetId('')
          if (props.onSuccess) {
            props.onSuccess()
          }
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e?.response?.data?.message,
          });
        }

        setAssetId('')
        if (props.onSuccess) {
          props.onSuccess()
        }
      }
    }

    else if (props.title === 'Experience Data') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/user/experience-info/delete/${experienceDataId}`, {
          headers: {
            token: cookieToken
          }
        })
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Experience Info Deleted successfully",
          });
          setExperienceDataId('')
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setExperienceDataId('')
      }
    }

    else if (props.title === 'Feedback') {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_GATEWAY_URL}/feedbacks/delete/${feedbackId}`, {
          headers: {
            token: cookieToken
          }
        })
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
          });
          setFeedbackId('')
        }
      }
      catch (e) {
        if (!e.response) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Some thing went wrong.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: e.response.data.message,
          });
        }

        setFeedbackId('')
      }
    }


  };


  useEffect(() => {
    if (props.title === 'Employees') {
      setEmployeeId(props.deleteModalData.user_id)
    }
    else if (props.title === 'Education Data') {
      setEducationDataId(props.deleteModalData.id)
    }
    else if (props.title === 'Experience Data') {
      setExperienceDataId(props.deleteModalData.id)
    }
    else if (props.title === 'Feedback'){
      setFeedbackId(props.deleteModalData.id)
    }
    else if (props.title === 'Category'){
      setCategoryId(props.deleteModalData.id)
    }
    else if (props.title === 'Sub Category'){
      setSubCategoryId(props.deleteModalData.id)
    }
    else if (props.title === 'Locations'){
      setLocationId(props.deleteModalData.id)
    }
    else if (props.title === 'Assets'){

      setAssetId(props.deleteModalData.id)
    }
    else if (props.title === 'Holidays'){
      setHolidayId(props.deleteModalData.id)
    }
    else if (props.title === 'Careers'){
      setCareerId(props.deleteModalData.id)
    }
    else if (props.title === 'Referrals'){
      setReferralId(props.deleteModalData.id)
      }
      else if(props.title === 'Cities'){
        setCityId(props.deleteModalData.id)
      }
      else if(props.title === 'Departments'){
        setDepartmentId(props.deleteModalData.id)
      }
      else if(props.title === 'Designations'){
        setDesignationId(props.deleteModalData.id)
      }



  }, [props.deleteModalData.id]);



  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4>Are you sure you want to delete?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete}
          className="btn btn-primary cancel-btn col-6"
        >Delete</Button>
        <Button onClick={props.hide}
          className="btn btn-primary cancel-btn col-6"
        >Close</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default UserDeletModal