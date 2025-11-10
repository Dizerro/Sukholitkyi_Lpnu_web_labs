function PrimaryButton({ label, onClick }) {
  return (
    <button className="primary-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default PrimaryButton;
