import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from '../../assets/icons/index';
import './modal.style.scss';

// TODO: modal을 한번에 여러 개 열었을 경우 stack 구조 적용해야할 수 있음

export const Modal = ({ children, modalHandler }) => {
  const modalRoot = document.getElementById('modal-root');

  const onClose = () => {
    if (modalHandler) {
      modalHandler();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <ModalContainer onClose={onClose}>{children}</ModalContainer>
          <ModalBackground onClose={onClose} />
        </>,
        modalRoot
      )}
    </>
  );
};

const ModalBackground = () => {
  return <div className='modal__background'></div>;
};

const ModalContainer = ({ children, onClose }) => {
  return (
    <div className='modal__container'>
      <div className='modal__inner'>
        <MdClose
          className='modal__close-icon'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};
