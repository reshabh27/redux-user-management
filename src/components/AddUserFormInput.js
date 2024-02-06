// import React from "react";

// export const AddUserFormInput = ({
//   inpType,
//   inpId,
//   pHolder,
//   text,
//   fieldValue,
//   handleChange,
// }) => {
//   return (
//     <div className="mb-3">
//       <label htmlFor={inpId} className="form-label h4">
//         {text}:{" "}
//       </label>
//       <input
//         type={inpType}
//         className="form-control w-50 m-auto"
//         id={inpId}
//         name={inpId}
//         value={fieldValue}
//         placeholder={pHolder}
//         onChange={handleChange}
//         required
//       />
//     </div>
//   );
// };



import React from "react";

export const AddUserFormInput = ({
  inptype,
  inpId,
  pHolder,
  text,
  fieldValue,
  handleChange,
  errorMessage, // Add this prop for displaying validation errors
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={inpId} className="form-label">
        {text}
      </label>
      <input
        type={inptype}
        className={`form-control w-50 m-auto ${errorMessage ? "is-invalid" : ""}`} // Add is-invalid class if there's an error
        id={inpId}
        name={inpId}
        placeholder={pHolder}
        value={fieldValue}
        onChange={handleChange}
      />
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};
