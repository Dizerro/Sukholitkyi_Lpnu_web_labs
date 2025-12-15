const FormError = ({ error, touched }) => {
  if (!error || !touched) return null;

  return <div style={{ color: "red", fontSize: "14px" }}>{error}</div>;
};

export default FormError;
