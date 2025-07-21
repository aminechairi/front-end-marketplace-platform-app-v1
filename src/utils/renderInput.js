const renderInput = (formik, label, name, type = "text", placeholder = "") => (
  <div className="ab_inputs">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <input
      className="input"
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      style={{
        borderColor:
          formik.touched[name] && formik.errors[name]
            ? "var(--color-of-error)"
            : undefined,
      }}
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="error_of_input">{formik.errors[name]}</p>
    )}
  </div>
);

export default renderInput;
