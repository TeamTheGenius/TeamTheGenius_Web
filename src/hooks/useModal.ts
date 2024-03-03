import { useEffect, useRef, useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    const onClickNotModal = (e: MouseEvent) => {
      if (
        isModalOpened &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", onClickNotModal);

    return () => {
      document.removeEventListener("mousedown", onClickNotModal);
    };
  }, [isModalOpened]);

  return {
    isModalOpened,
    modalRef,
    openModal,
    closeModal,
  };
};

export default useModal;
