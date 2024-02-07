import React, { useState } from "react";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch, customFetchForFirebase } from "../utils";
import Demo from "./Demo";

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const oldUsers = await customFetchForFirebase("/profiles.json");
//   // console.log(oldUsers.data);
//   const transformedArray = Object.entries(oldUsers.data).map(
//     ([key, value]) => ({
//       ...value,
//       id: key,
//     })
//   );
//   // console.log(transformedArray);
//   const isNewEmailExists = transformedArray?.some(
//     (user) => user?.email === data?.email
//   );

//   if (isNewEmailExists) {
//     // Email already exists
//     alert("Email already exists in the data");
//     return null;
//   }
//   data.userPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
//   data.bio = "NA";
//   data.interest =["Science"];
//   console.log(data);
// return null;
//   try {
//     const response = await customFetchForFirebase.post("/profiles.json", data);
//     console.log(response);
//     alert("suceessfully created account");
//     // return null;
//     return redirect("/login");
//   } catch (error) {
//     const errorMessage = "please double check your credentials";
//     alert(errorMessage);
//     return null;
//   }
// };




const SignUp = () => {

     const [formValues, setFormValues] = useState({
       fullname: "",
       email: "",
       password: "",
       empId: "NA", // Add additional fields as needed
       department: "NA",
       role: "user",
     });

    // const [selectedRole, setSelectedRole] = useState("user");
    const [cropData, setCropData] = useState("#");
     const navigate = useNavigate();

    // const handleRoleChange = (e) => {
    //   setSelectedRole(e.target.value);
    // };

     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormValues((prevValues) => ({
         ...prevValues,
         [name]: value,
       }));
     };

    const renderRoleSpecificFields = () => {
      switch (formValues.role) {
        case "admin":
          return <FormInput type="text" label="Employee ID" name="empId" value={formValues.empId} onChange={handleInputChange} />;
        case "editor":
          return <FormInput type="text" label="Department" name="department" value={formValues.department} onChange={handleInputChange}/>;
        default:
          return null;
      }
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = {
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: e.target.role.value,
        empId: e.target.empId ? e.target.empId.value : "", // Include additional fields as needed
        department: e.target.department ? e.target.department.value : "",
        croppedImage : cropData,
      };
      // console.log("Form Data:", formData);
      

      const oldUsers = await customFetchForFirebase("/profiles.json");
      // console.log(oldUsers.data);
      const transformedArray = Object.entries(oldUsers.data).map(
        ([key, value]) => ({
          ...value,
          id: key,
        })
      );
      // console.log(transformedArray);
      const isNewEmailExists = transformedArray?.some(
        (user) => user?.email === formData?.email
      );

      if (isNewEmailExists) {
        // Email already exists
        alert("Email already exists in the data");
        return null;
      }
      formData.bio = "NA";
      formData.interest = ["Science"];
      // console.log(formData);
      // return null;
      try {
        const response = await customFetchForFirebase.post("/profiles.json", formData);
        // console.log(response);
        alert("suceessfully created account");
        // return null;
        navigate("/login");
      } catch (error) {
        const errorMessage = "please double check your credentials";
        alert(errorMessage);
      }

    }

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, #7bd0f9, #68c3ff, #78b1ff, #a299ff, #d277fc)",
        minHeight: "100vh",
      }}
      className="p-5"
    >
      <section
        className="container bg-white rounded mt-5"
        style={{ width: "30%", minWidth: "275px" }}
      >
          <h1 className="font-bold text-5xl text-center mb-5 mt-4 authheader">
            Register
          </h1>
          

          <div className="place-items-center m-4 pb-4">
            <Demo cropData={cropData} setCropData={setCropData} />
          </div>
        <Form onSubmit={handleSubmit} className="p-4 rounded">


          <FormInput type="text" label="FullName" name="fullname" value={formValues.fullname} onChange={handleInputChange} />
          <FormInput type="email" label="Email" name="email" value={formValues.email} onChange={handleInputChange}/>
          <FormInput type="password" label="Password" name="password" value={formValues.password} onChange={handleInputChange}/>

          <label htmlFor="roleSelect"><b>Select Role</b></label>
          <select
            id="roleSelect"
            className="shadow-lg p-3 m-2 bg-body-tertiary rounded border border-dark-subtle gradient-placeholder"
            value={formValues.role}
            onChange={handleInputChange}
            name="role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>

          {renderRoleSpecificFields()}

          <div className="d-grid gap-2 mt-5">
            <SubmitBtn text="SignUp" />
          </div>

          <p className="mt-3">
            Already a member?
            <Link to="/login" className="btn btn-outline-danger ms-2">
              Login
            </Link>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default SignUp;
