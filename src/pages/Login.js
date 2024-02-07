import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import SubmitBtn from '../components/SubmitBtn';
import { customFetchForFirebase } from '../utils';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';



export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const [validationErrors, setValidationErrors] = useState({
      email: "",
      password: "",
    });

    const validateForm = () => {
      let isValid = true;
      const errors = {};
      // console.log(formData);
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
        errors.password = "Password must be at least 4 characters";
        isValid = false;
      }

      setValidationErrors(errors);
      return isValid;
    };

    const isValidEmail = (email) => {
      // Add your email validation logic here
      return /\S+@\S+\.\S+/.test(email);
    };


    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
      e.preventDefault();

      const isValid = validateForm();

      if (isValid)
      {
        try {
          const usersData = await customFetchForFirebase( `/profiles.json` );
          // console.log(usersData.data);
          const transformedArray = Object.entries(usersData.data).map(
            ([key, value]) => ({
              ...value,
              id: key,
            })
          );
          console.log(transformedArray);
          const matchedUser = transformedArray.find((user) => user.email === formData.email && user.password === formData.password);
          if (matchedUser) {
            dispatch(loginUser(matchedUser));
            navigate("/");
            console.log("Login successful!");
          } else {
            alert("Wrong email or password");
          }
          // if (transformedArray.length) {
          //   const user = usersData.data[0];
          //   // Check if the entered password matches the user's password
          //   if (formData.password === user.password) {
          //     // Passwords match, dispatch the LOGIN_USER action
          //     dispatch(loginUser(user));
          //     navigate("/");
          //   } else {
          //     // Passwords don't match, show an alert
          //     alert("Wrong password");
          //   }
          // } else {
          //   const errorMessage = "This email is not registered";
          //   alert(errorMessage);
          //   return null;
          // }
        } catch (error) {
          console.error("Login error:", error);
          alert("An error occurred during login.");
        }
      }
      else
      {
        alert("Form validation failed. Please check the errors.");
      }
    };


  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #7bd0f9, #68c3ff, #78b1ff, #a299ff, #d277fc)",
        minHeight: "100vh",
      }}
      className="p-5"
    >
      <section
        className="container bg-white rounded mt-5"
        style={{ width: "30%", minWidth: "275px" }}
      >
        <Form method="post" className="formcontrol" onSubmit={handleLogin}>
          <br />
          <br />
          <h1 className="font-bold	text-5xl authheader">Login</h1>
          <br />
          <br />
          <br />
          <FormInput type="email" label="Email" name="email" onChange={handleInputChange} errorMessage={validationErrors.email}/>
          <FormInput type="password" label="Password" name="password" onChange={handleInputChange} errorMessage={validationErrors.password}/>
          <br />
          <div>
            <SubmitBtn text="Login" />
          </div>
          <br /> <br />
          <p className="pb-5">
            Not a member yet?{" "}
            <Link className="btn btn-outline-danger" to="/signup">
              Register
            </Link>
          </p>
        </Form>
      </section>
    </div>
  );
}
