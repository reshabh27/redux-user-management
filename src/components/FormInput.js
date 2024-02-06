const FormInput = ({ label, name, type, defaultValue, size , handleInputChange, errorMessage}) => {
  return (
    <div className="place-items-center m-4">
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={label}
        className={`shadow-lg p-3 m-2 bg-body-tertiary rounded border border-dark-subtle gradient-placeholder ${errorMessage ? "is-invalid" : ""}`}
        onChange={handleInputChange}
        required
      />
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};
export default FormInput;
