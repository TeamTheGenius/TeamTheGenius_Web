import { create } from "zustand";

interface ModalType {
  modal: React.ReactNode | null;
  isModalOpen: boolean;
  setModal: (newState: React.ReactNode | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalType>((set) => ({
  modal: null,
  isModalOpen: false,
  setModal: (newState) => {
    document.body.style.overflow = "hidden";
    set({ modal: newState, isModalOpen: true });
  },
  closeModal: () => {
    document.body.style.overflow = "unset";
    set({ isModalOpen: false });
  },
}));
