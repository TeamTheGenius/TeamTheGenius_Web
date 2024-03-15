import { useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(true);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return {
    isModalOpened,
    openModal,
    closeModal,
  };
};

export default useModal;
