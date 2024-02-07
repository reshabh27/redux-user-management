import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
// import { customFetchForFirebase } from "../utils";

const defaultSrc =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Demo = ({cropData,setCropData}) => {
  const [image, setImage] = useState(defaultSrc);
  // const [cropData, setCropData] = useState("#");
  const [showModal, setShowModal] = useState(false);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

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
      setShowModal(true);
    }
    // handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Construct the data to be sent in the POST request
  //   const data = {
  //     croppedImage: cropData,
  //   };

  //   try {
  //     // Send a POST request to your Firebase database
  //     console.log(process.env.REACT_APP_API_URL);
  //     const response = await customFetchForFirebase.post("/profiles.json", {
  //       ...data,
  //     });
  //     console.log(response);

  //     // Check if the request was successful
  //     if (response.status === 200) {
  //       alert("Data updated successfully!");
  //     } else {
  //       alert("Failed to update data. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     alert("An error occurred while updating data.");
  //   }
  // };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <br />
          <br />
          <button className="btn btn-primary" onClick={getCropData}>
            Open Cropper
          </button>
        </div>
      </div>

      {/* Modal for Cropper */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crop Image</h5>
              <button type="button" className="close" onClick={handleClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="mb-2">
                <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
                  Choose File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onChange}
                  style={{ display: "none" }}
                />
              </div>


              <input
                type="file"
                ref={fileInputRef}
                onChange={onChange}
                style={{ display: "none" }}
              />
              <Cropper
                ref={cropperRef}
                style={{ width: "100%", height: "60vh" }}
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
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={getCropData}>
                Crop Image
              </button>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Cropped Image on the page */}
      <div className="row mt-4 mx-auto">
        <div className="col-md-6">
          <h1>Selected image</h1>
          <img
            className="img-fluid"
            style={{ width: "50%", height: "50%" }}
            src={cropData}
            alt="cropped"
          />
        </div>
      </div>

      {/* <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Update Data
      </button> */}
    </div>
  );
};

export default Demo;
