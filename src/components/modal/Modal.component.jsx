import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from '../../assets/icons/index';
import './modal.style.scss';
import { classNames } from '../../utils';

// TODO: modal을 한번에 여러 개 열었을 경우 stack 구조 적용해야할 수 있음

export const Modal = ({ className, children, modalHandler, useCloseIcon }) => {
  const modalRoot = document.getElementById('modal-root');

  const onClose = () => {
    if (modalHandler) {
      modalHandler();
    }
  };

  useEffect(() => {
    const preventBodyScroll = (event) => {
      event.preventDefault();
    };
    document.body.addEventListener('wheel', preventBodyScroll, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('wheel', preventBodyScroll, {
        passive: false,
      });
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <ModalContainer
            className={className}
            onClose={onClose}
            useCloseIcon={useCloseIcon}
          >
            {children}
          </ModalContainer>
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

const ModalContainer = ({ className, children, onClose, useCloseIcon }) => {
  return (
    <div className='modal__container'>
      <div
        className={classNames(
          'modal__inner',
          className,
          useCloseIcon ? 'pad-top' : ''
        )}
      >
        {useCloseIcon && (
          <MdClose
            className='modal__close-icon'
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};
