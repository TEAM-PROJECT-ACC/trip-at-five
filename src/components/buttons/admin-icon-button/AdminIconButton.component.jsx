import './AdminIconButton.style.scss';

const AdminIconButton = ({ onClick, children }) => {
  return (
    <button
      className='icon-button'
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default AdminIconButton;
