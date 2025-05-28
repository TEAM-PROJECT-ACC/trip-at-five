import { useEffect, useState } from 'react';
import { classNames } from '../../../../utils';
import { createPortal } from 'react-dom';
import { diaryCover } from '../../../../assets/images';
import { MdClose } from '../../../../assets/icons/index';
import './diaryAnimation.style.scss';

export const DiaryAnimation = ({ onClose }) => {
  const [startFirstAnimation, setStartFirstAnimation] = useState(() => false);
  const [startSecondsAnimation, setStartSecondsAnimation] = useState(
    () => false
  );
  const [startThirdAnimation, setStartThirdAnimation] = useState(() => false);

  useEffect(() => {
    if (!startFirstAnimation) {
      setStartFirstAnimation(() => true);
    }
  }, [startFirstAnimation]);

  useEffect(() => {
    if (startFirstAnimation) {
      setTimeout(() => {
        setStartSecondsAnimation(() => true);
      }, 310);
    }
  }, [startFirstAnimation]);

  useEffect(() => {
    if (startSecondsAnimation) {
      setTimeout(() => {
        setStartThirdAnimation(() => true);
      }, 310);
    }
  }, [startSecondsAnimation]);

  return (
    <Modal>
      <div className='diary-animation__modal'>
        <MdClose
          className='diary-animation__close-button'
          onClick={onClose}
        />
        <div
          className={classNames(
            'diary-animation__container',
            startFirstAnimation ? 'first-animation' : '',
            startSecondsAnimation ? 'seconds-animation' : '',
            startThirdAnimation ? 'third-animation' : ''
          )}
        >
          <div
            className={classNames(
              'diary-animation__page first',
              startThirdAnimation ? 'third-animation' : ''
            )}
          >
            <div className='diary-animation__page-inner'>
              <img
                className='diary-animation__open-page cover-img'
                src={diaryCover}
                alt='diary-cover'
              />
            </div>
          </div>
          <div className={classNames('diary-animation__page seconds')}>
            <div className='diary-animation__contents-page'>일지 내용</div>
          </div>
        </div>
        <div className='diary-animation__background'></div>
      </div>
    </Modal>
  );
};

const Modal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');

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

  return <>{createPortal(children, modalRoot)}</>;
};
