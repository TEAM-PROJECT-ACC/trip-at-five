import './modalContainer.style.scss';

export const ModalContainer = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');

  return (
    <>
      <div className='modal__background'></div>
      <div className='modal__container'>{children}</div>
    </>
  );
};

const ModalBackground = () => {
  return <div className='modal__background'></div>;
};
