import React, { useState } from 'react'
import { AddUserFormInput } from '../components/AddUserFormInput';
import { customFetch } from '../utils';
import { useLoaderData, useNavigate } from 'react-router-dom';
import TagInputWithAutocomplete from '../components/TagInputWithAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { removeTagVal } from '../features/user/userSlice';

export const loader = async ({params}) => {
  const response = await customFetch.get(`/profiles/${params.id}`);
  const userToUpdate = response.data;
//   console.log(userToUpdate);
  return { userToUpdate };
};

export const UpdateUser = () => {
    const fetchedData = useLoaderData()
    const navigate = useNavigate();
    // console.log(fetchedData);
 const [formData, setFormData] = useState(fetchedData.userToUpdate);
  const tagVal = useSelector((state) => state.userState.tagVal);
  const dispatch = useDispatch();

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
    try {
      e.preventDefault();

      setFormData((prevData) => ({
        ...prevData,
        interest: tagVal,
      }));
      const updatedFormData = await new Promise((resolve) => {
        setFormData((prevData) => {
          resolve(prevData);
          return prevData; 
        });
      });
      // console.log(updatedFormData);
       await customFetch.patch(`/profiles/${formData.id}`, { ...updatedFormData });
       dispatch(removeTagVal());
    //   console.log(response);
      alert("Submit successful:");
        navigate("/");
    } catch (error) {
      alert("Error submitting the form:");
    }
  };

  return (
    <div className="container mt-4">
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

        <AddUserFormInput
          inptype="text"
          inpId="userPic"
          pHolder="Enter Profile Pic link"
          text="Profile Image"
          fieldValue={formData.userPic}
          handleChange={handleInputChange}
        />

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

        <TagInputWithAutocomplete />

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </div>
  );
}
