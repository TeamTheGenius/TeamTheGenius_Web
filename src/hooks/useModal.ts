import { useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpened(false);
    document.body.style.overflow = "unset";
  };

  return {
    isModalOpened,
    openModal,
    closeModal,
  };
};

export default useModal;
