import './AccomFacButton.style.scss';

const AccomFacButton = ({ type, icon, title, ...props }) => {
  return (
    <button
      type={type}
      title={title}
      className='accom-fac-button'
      {...props}
    >
      {icon}
    </button>
  );
};

export default AccomFacButton;
