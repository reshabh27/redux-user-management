import React, {  useState } from "react";
import { AddUserFormInput } from "../components/AddUserFormInput";
import { customFetchForFirebase } from "../utils";
import TagInputWithAutocomplete from "../components/TagInputWithAutocomplete";

import { useDispatch, useSelector } from "react-redux";
import { removeTagVal } from "../features/user/userSlice";
import Demo from "./Demo";
import { Button } from "react-bootstrap";



const AddUser = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
    empId: "",
    department: "",
    croppedImage:"",
    bio: "NA",
    interest: [],
  });
  const [cropData, setCropData] = useState("#");
  const [isDisabled, setIsDisabled] = useState(0);

  const [validationErrors, setValidationErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    empId: "",
    department: "",
    bio: "",
  });




  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate Fullname
    if (!formData.fullname.trim()) {
      errors.fullname = "Fullname is required";
      isValid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    // Validate Password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 4) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Validate Employee ID (if role is admin)
    if (formData.role === "admin" && !formData.empId.trim()) {
      errors.empId = "Employee ID is required for admin";
      isValid = false;
    }

    // Validate Department (if role is editor)
    if (formData.role === "editor" && !formData.department.trim()) {
      errors.department = "Department is required for editor";
      isValid = false;
    }

    // Add additional validations for other fields

    setValidationErrors(errors);
    return isValid;
  };


   const isValidEmail = (email) => {
     // Add your email validation logic here
     return /\S+@\S+\.\S+/.test(email);
   };


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
      role,
      empId: role === 'admin' ? '' : prevData.empId,
      department: role === 'editor' ? '' : prevData.department,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDisabled(1);

     const isValid = validateForm();
    if (isValid)
    {
      try {
        // console.log(tagVal);
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
            return prevData; // This return is required for the promise resolution
          });
        });
        // console.log(updatedFormData);
        const response = await customFetchForFirebase.post("/profiles.json", {
          ...updatedFormData,
        });
        // Handle the response as needed

        dispatch(removeTagVal());

        alert("Submit successful:", response);
      } catch (error) {
        alert("Error submitting the form:");
      }
    }
    else
    {
      alert("Form validation failed. Please check the errors.");
    }
    setIsDisabled(0);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="place-items-center m-4 pb-4">
        <Demo cropData={cropData} setCropData={setCropData} />
      </div>
      <form onSubmit={handleSubmit}>
        <AddUserFormInput
          inptype="text"
          inpId="fullname"
          pHolder="Enter Full Name"
          text="Full Name"
          fieldValue={formData.fullname}
          handleChange={handleInputChange}
          errorMessage={validationErrors.fullname}
        />

        <AddUserFormInput
          inptype="email"
          inpId="email"
          pHolder="Enter Email"
          text="Email"
          fieldValue={formData.email}
          handleChange={handleInputChange}
          errorMessage={validationErrors.email}
        />

        <AddUserFormInput
          inptype="password"
          inpId="password"
          pHolder="Enter Password"
          text="Password"
          fieldValue={formData.password}
          handleChange={handleInputChange}
          errorMessage={validationErrors.password}
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
            errorMessage={validationErrors.empId}
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
            errorMessage={validationErrors.department}
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

        <TagInputWithAutocomplete />

        <Button type="submit" className="btn btn-primary" disabled={isDisabled}>
          {isDisabled ? (
            <>
              <span className=""></span>
              sending...
            </>
          ) : (
           "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
