import React, { useState } from 'react'
import { AddUserFormInput } from '../components/AddUserFormInput';
import { customFetch } from '../utils';
import { useLoaderData, useNavigate } from 'react-router-dom';

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

  const handleInterestChange = (e) => {
    const interests = e.target.value.split(',').map((interest) => interest.trim());
    setFormData({...formData,interest:interests})
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      // Assuming customFetch.post returns a response
       await customFetch.patch(`/profiles/${formData.id}`, { ...formData });
    //   console.log(response);
      // Handle the response as needed
      alert("Submit successful:");
        navigate("/");
    } catch (error) {
      alert("Error submitting the form:");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleUpdate}>
        <AddUserFormInput inptype="text" inpId="fullname" pHolder="Enter Full Name" text="Full Name" 
        fieldValue={formData.fullname} handleChange={handleInputChange} />
        
        <AddUserFormInput inptype="email" inpId="email" pHolder="Enter Email" text="Email" 
        fieldValue={formData.email} handleChange={handleInputChange} />

        <AddUserFormInput inptype="password" inpId="password" pHolder="Enter Password" text="Password" 
        fieldValue={formData.password} handleChange={handleInputChange} />

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
            <AddUserFormInput inptype="text" inpId="empId" pHolder="Enter Employee ID" text="Employee ID" 
            fieldValue={formData.empId} handleChange={handleInputChange} />
        )}
        {formData.role === "editor" && (
            <AddUserFormInput inptype="text" inpId="department" pHolder="Enter Department" text="Department" 
            fieldValue={formData.department} handleChange={handleInputChange} />
        )}


        <AddUserFormInput inptype="text" inpId="userPic" pHolder="Enter Profile Pic link" text="Profile Image" 
            fieldValue={formData.userPic} handleChange={handleInputChange} />
        
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

            <div className="mb-3">
          <label htmlFor="interest" className="form-label">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            className="form-control w-50 m-auto"
            id="interest"
            name="interest"
            value={formData.interest?.join(', ')}
            onChange={handleInterestChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </div>
  );
}
