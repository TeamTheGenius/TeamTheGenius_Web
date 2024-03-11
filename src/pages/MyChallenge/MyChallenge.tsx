import MyChallengeHeader from "@/components/Main/MyChallenge/MyChallengeHeader/MyChallengeHeader";
import "@/pages/MyChallenge/MyChallengeStyle.css";
import useModal from "@/hooks/useModal";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalLayer } from "@/components/Common/Modal/Modal";

const MyChallenge = () => {
  const { isModalOpened, openModal, closeModal } = useModal();
  const [modal, setModal] = useState<React.ReactNode>(<div></div>);

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
      <div className="w-full px-[2rem]">
        <MyChallengeHeader />
        <Outlet context={{ setModal, openModal, closeModal }} />
      </div>
    </>
  );
};

export default MyChallenge;
