import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
import axios from "axios";
import { customFetchForFirebase } from "../utils";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Demo = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);
  const [email, setEmail] = useState(""); // Add state for email

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email is not empty
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    // Construct the data to be sent in the POST request
    const data = {
      email: email,
      croppedImage: cropData,
    };

    try {
      // Send a POST request to your Firebase database
      const response = await customFetchForFirebase.post("/profiles.json", {...data});
      console.log(response);

      // Check if the request was successful
      if (response.status === 200) {
        alert("Data updated successfully!");
      } else {
        alert("Failed to update data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while updating data.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <input type="file" onChange={onChange} />
          <br />
          <br />
          <Cropper
            ref={cropperRef}
            style={{ width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
          <h1>
            <button className="btn btn-primary" onClick={getCropData}>
              Crop Image
            </button>
          </h1>
        </div>
        <div className="col-md-6">
          <div className="box" style={{ height: "300px" }}>
            <h1>Cropped image</h1>
            <img
              className="img-fluid"
              style={{ width: "100%", height: "100%" }}
              src={cropData}
              alt="cropped"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Update Data
      </button>
    </div>
  );
};

export default Demo;
