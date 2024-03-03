import MyChallengeHeader from "@/components/Main/MyChallenge/MyChallengeHeader/MyChallengeHeader";
import "@/pages/MyChallenge/MyChallengeStyle.css";
import useModal from "@/hooks/useModal";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalLayer } from "@/components/Common/Modal/Modal";

const MyChallenge = () => {
  const { isModalOpened, openModal, closeModal, modalRef } = useModal();
  const [modal, setModal] = useState<React.ReactNode>(<div></div>);

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer modalRef={modalRef}>{modal}</ModalLayer>
      )}
      <div className="w-full px-[2rem]">
        <MyChallengeHeader />
      </div>
      <Outlet context={{ setModal, openModal, closeModal }} />
    </>
  );
};

export default MyChallenge;
