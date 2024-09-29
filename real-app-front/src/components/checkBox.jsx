function CheckBox({ label, error, ...rest }) {
  return (
    <div className="input-group mb-3 d-flex flex-column w-50">
      <label htmlFor={rest.name} className="form-label">
        {label}
        {rest.required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        {...rest}
        className={["form-check-input", error && "is-invalid"]
          .filter(Boolean)
          .join(" ")}
        id={rest.name}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}

export default CheckBox;
