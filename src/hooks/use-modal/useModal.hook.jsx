import { createPortal } from 'react-dom';

export const useModal = () => {
  // const [isOpen, setIsOpen] = useState(() => false);

  const handleModalPortals = (modalComponent) => {
    const modalContainer = document.getElementById('modal-container');
    console.log(modalContainer);

    return createPortal(modalComponent, modalContainer);
  };

  return {
    handleModalPortals,
  };
};
