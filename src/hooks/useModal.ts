import { useRef, useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return {
    isModalOpened,
    modalContentRef,
    openModal,
    closeModal,
  };
};

export default useModal;
