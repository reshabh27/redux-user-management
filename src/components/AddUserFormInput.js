import React from "react";

export const AddUserFormInput = ({
  inpType,
  inpId,
  pHolder,
  text,
  fieldValue,
  handleChange,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={inpId} className="form-label h4">
        {text}:{" "}
      </label>
      <input
        type={inpType}
        className="form-control w-50 m-auto"
        id={inpId}
        name={inpId}
        value={fieldValue}
        placeholder={pHolder}
        onChange={handleChange}
        required
      />
    </div>
  );
};
