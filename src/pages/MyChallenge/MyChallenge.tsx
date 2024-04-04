import MyChallengeHeader from "@/components/Main/MyChallenge/MyChallengeHeader/MyChallengeHeader";
import "@/pages/MyChallenge/MyChallengeStyle.css";
import useModal from "@/hooks/useModal";
import React, { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

const MyChallenge = () => {
  const { isModalOpened, openModal, closeModal } = useModal();
  const [modal, setModal] = useState<React.ReactNode>(<div></div>);

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
      <div className="w-full h-full">
        <MyChallengeHeader />
        <Suspense fallback={<LoadingBox />}>
          <Outlet context={{ setModal, openModal, closeModal }} />
        </Suspense>
      </div>
    </>
  );
};

export default MyChallenge;
