import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(() => false);

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return {
    isModalOpen,
    handleModalOpen,
  };
};
