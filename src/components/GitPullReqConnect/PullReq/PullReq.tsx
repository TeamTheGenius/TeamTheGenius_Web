import Button from "@/components/Common/Button";
import getPullRequestVerifyApi from "@/apis/getPullRequestVerifyApi";
import checkIcon from "@/assets/icon/check-icon.svg";
import failIcon from "@/assets/icon/sign-icon.svg";
import { useEffect, useState } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import useModal from "@/hooks/useModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import GitPullReqModal from "../GitPullReqModal/GitPullReqModal";
type PullReqType = {
  label: string;
  repoState: string;
  setPrBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  repoBoolean: boolean;
  prBoolean: boolean;
};

function PullReq({
  label,
  repoState,
  setPrBoolean,
  repoBoolean,
  prBoolean,
}: PullReqType) {
  const [loadingState, setLoadingState] = useState(false);
  const [messageState, setMesseageState] = useState("");
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();

  const pullReqCheck = async () => {
    setLoadingState(true);
    await getPullRequestVerifyApi({
      openModal: openModal,
      setMesseageState: setMesseageState,
      repo: repoState,
      setPrBoolean: setPrBoolean,
      setLoadingState: setLoadingState,
    }).catch((err) => {
      setPrBoolean(false);
      setLoadingState(false);
      setMesseageState(err.response.data.message);
    });

    openModal();
  };

  const pullReqFalse = () => {
    openModal();
    setModal(
      <GitPullReqModal
        closeModal={closeModal}
        messageState={"레포지토리 선택을 먼저 진행해주세요."}
      />
    );
  };
  useEffect(() => {
    if (messageState) {
      setModal(
        <GitPullReqModal closeModal={closeModal} messageState={messageState} />
      );
    }
  }, [messageState]);
  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
      <div className={`flex flex-col w-full`}>
        <div className="flex items-center mb-[1.5rem] ml-[6.5rem] _md:ml-0 _sm:ml-0">
          <span className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}>
            {label}
          </span>
          <div>
            {prBoolean === true ? (
              <>
                <img src={checkIcon} alt="Icon" />
              </>
            ) : (
              <>
                <img src={failIcon} alt="Icon" />
              </>
            )}
          </div>
        </div>
        {loadingState ? (
          <LoadingBox />
        ) : (
          <div className="flex items-center ml-[8.5rem] _md:ml-[2rem] _sm:ml-[2rem] pt-[0.6rem] ">
            {repoBoolean === true ? (
              <Button
                width="w-[8.7rem]"
                height="h-[3.1rem]"
                content="연결확인"
                fontWeight="font-medium"
                backgroundColor="bg-[#18C665]"
                textColor="text-white"
                textSize="text-[1.3rem]"
                handleClick={pullReqCheck}
              />
            ) : (
              <Button
                width="w-[8.7rem]"
                height="h-[3.1rem]"
                content="연결확인"
                fontWeight="font-medium"
                backgroundColor="bg-[#666666]"
                textColor="text-[#dddddd]"
                textSize="text-[1.3rem]"
                handleClick={pullReqFalse}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default PullReq;
