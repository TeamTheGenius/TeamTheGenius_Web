import Button from "@/components/Common/Button";
import checkIcon from "@/assets/icon/check-icon.svg";
import failIcon from "@/assets/icon/sign-icon.svg";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useModalStore } from "@/stores/modalStore";
import { useGetVerifyPullRequest } from "@/hooks/queries/useGithubQuery";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
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
  const { setModal, closeModal } = useModalStore();

  const onErrorGetVerifyPullRequest = () => {
    setPrBoolean(false);
  };

  const onSuccessGetVerifyPullRequest = () => {
    setPrBoolean(true);
  };

  const {
    mutate: getVerifyPullRequestMutate,
    isLoading: getVerifyPullRequestLoading,
  } = useGetVerifyPullRequest({
    onSuccess: onSuccessGetVerifyPullRequest,
    onError: onErrorGetVerifyPullRequest,
  });

  const pullReqCheck = () => {
    getVerifyPullRequestMutate({ repo: repoState });
  };

  const pullReqFalse = () => {
    setModal(
      <CommonModal
        buttonContent="확인"
        onClick={closeModal}
        content={"레포지토리 선택을 먼저 진행해주세요."}
      />
    );
  };

  return (
    <>
      <div className={`flex flex-col w-full`}>
        <div className="flex items-center mb-[1.5rem] ml-[6.5rem] _md:ml-0 _sm:ml-0">
          <span className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}>
            {label}
          </span>
          <div>
            {prBoolean === true ? (
              <img src={checkIcon} alt="Icon" />
            ) : (
              <img src={failIcon} alt="Icon" />
            )}
          </div>
        </div>

        {getVerifyPullRequestLoading && <LoadingBox />}
        {!getVerifyPullRequestLoading && (
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
