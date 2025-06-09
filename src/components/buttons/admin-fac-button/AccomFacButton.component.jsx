import './AccomFacButton.style.scss';

const AccomFacButton = ({ type, icon, title, active, ...props }) => {
  return (
    <button
      type={type}
      title={title}
      className={`accom-fac-button ${active ? 'active' : ''}`}
      {...props}
    >
      {icon}
    </button>
  );
};

export default AccomFacButton;
