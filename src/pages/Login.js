import React, { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import SubmitBtn from '../components/SubmitBtn';
import { customFetch } from '../utils';
import { useGlobalContext } from '../context';



export const Login = () => {
    const {dispatch} = useGlobalContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const usersData = await customFetch(`/profiles?email=${formData.email}`);
        // console.log(usersData.data);
        if(usersData.data.length)
        {
            const user = usersData.data[0];
            // Check if the entered password matches the user's password
            if (formData.password === user.password) {
              // Passwords match, dispatch the LOGIN_USER action
              dispatch({ type: "LOGIN_USER", payload: user });
              navigate("/");
            } else {
              // Passwords don't match, show an alert
              alert("Wrong password");
            }
        }
        else
        {
            const errorMessage = "This email is not registered";
            alert(errorMessage);
            return null;
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
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
          <FormInput type="email" label="Email" name="email" handleInputChange={handleInputChange}/>
          <FormInput type="password" label="Password" name="password" handleInputChange={handleInputChange}/>
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
