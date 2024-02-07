import React, {  useState } from 'react'
import { AddUserFormInput } from '../components/AddUserFormInput';
import {  customFetchForFirebase } from '../utils';
import { useLoaderData, useNavigate } from 'react-router-dom';
import TagInputWithAutocomplete from '../components/TagInputWithAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { removeTagVal} from '../features/user/userSlice';
import Demo from './Demo';
import { Button } from 'react-bootstrap';

export const loader = async ({params}) => {
  const response = await customFetchForFirebase.get(`/profiles/${params.id}.json`);
  const userToUpdate = {
    ...response.data,
    id: params.id,
  };
  // console.log(userToUpdate);
  return  userToUpdate ;
};

export const UpdateUser = () => {
    const fetchedData = useLoaderData()
    const navigate = useNavigate();
    // console.log(fetchedData);
    const [formData, setFormData] = useState(fetchedData);
    const [cropData, setCropData] = useState(fetchedData?.croppedImage);
    const [isDisabled,setIsDisabled] = useState(0);
    const tagVal = useSelector((state) => state.userState.tagVal);
    const dispatch = useDispatch();

    // useEffect(() => {
    //   // console.log(formData.interest);
    //   dispatch(setTagVal(formData.interest));
    // },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      role
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsDisabled(1);
    try {

      setFormData((prevData) => ({
        ...prevData,
        interest: tagVal,
      }));
       setFormData((prevData) => ({
         ...prevData,
         croppedImage: cropData,
       }));
      const updatedFormData = await new Promise((resolve) => {
        setFormData((prevData) => {
          resolve(prevData);
          return prevData; 
        });
      });
      console.log(updatedFormData);
       await customFetchForFirebase.patch(`/profiles/${updatedFormData.id}.json`, { ...updatedFormData });
       dispatch(removeTagVal());
    //   console.log(response);
      alert("Submit successful:");
        navigate("/");
    } catch (error) {
      alert("Error submitting the form:");
    }
    setIsDisabled(0);
  };

  return (
    <div className="container mt-4">
      <div className="place-items-center m-4 pb-4">
        <Demo cropData={cropData} setCropData={setCropData} />
      </div>
      <form onSubmit={handleUpdate}>
        <AddUserFormInput
          inptype="text"
          inpId="fullname"
          pHolder="Enter Full Name"
          text="Full Name"
          fieldValue={formData.fullname}
          handleChange={handleInputChange}
        />

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-control w-50 m-auto"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

        {formData.role === "admin" && (
          <AddUserFormInput
            inptype="text"
            inpId="empId"
            pHolder="Enter Employee ID"
            text="Employee ID"
            fieldValue={formData.empId}
            handleChange={handleInputChange}
          />
        )}
        {formData.role === "editor" && (
          <AddUserFormInput
            inptype="text"
            inpId="department"
            pHolder="Enter Department"
            text="Department"
            fieldValue={formData.department}
            handleChange={handleInputChange}
          />
        )}

        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control w-50 m-auto"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>

        <TagInputWithAutocomplete initialTags={formData.interest} />

        <Button type="submit" className="btn btn-primary" disabled={isDisabled}>
          {isDisabled ? (
            <>
              <span className=""></span>
              updating...
            </>
          ) : (
            "Update User"
          )}
        </Button>
      </form>
    </div>
  );
}
