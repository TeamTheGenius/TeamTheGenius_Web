import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import successStamp from "@/assets/icon/success-stamp.svg";
import { PATH } from "@/constants/path";
import getMyChallengeActivity from "@/apis/getMyChallengeActivity";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";
import postTodayCertification from "@/apis/postTodayCertification";
import MyChallengePassItem from "@/components/Main/MyChallenge/MyChallengePass/MyChallengePassItem";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { getToday } from "@/utils/getToday";
import CertificationPassModal from "@/components/Main/MyChallenge/MyChallengeModal/CertificationPassModal/CertificationPassModal";

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  repository: string;
  certificateStatus: "패스 완료" | "인증 갱신" | "인증하기";
  numOfPassItem: number;
  canUsePassItem: boolean;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

const MyChallengeProgress = () => {
  const { isModalOpened, openModal, closeModal, modalRef } = useModal();
  const [modal, setModal] = useState<React.ReactNode>();

  const { data, refetch } = useQuery<Data[]>({
    queryKey: ["myChallengeActivity"],
    queryFn: () => getMyChallengeActivity(),
  });

  if (!data) {
    return;
  }

  const onClickPassItem = (instanceId: number) => {
    setModal(
      <CertificationPassModal
        closeModal={closeModal}
        instanceId={instanceId}
        refetch={refetch}
        setModal={setModal}
      />
    );
    openModal();
  };

  const reNewCertification = async (instanceId: number) => {
    const today = getToday();
    await postTodayCertification({
      instanceId: instanceId,
      targetDate: today,
    });
    refetch();
  };

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer modalRef={modalRef}>{modal}</ModalLayer>
      )}

      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <div className="relative w-full">
              <div
                key={index}
                className="flex justify-between w-full relative mb-[1.3rem]"
              >
                <MyChallengeLinkWrap
                  key={index}
                  link={`${PATH.CERTIFICATION}/${item.instanceId}/my-current`}
                >
                  <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                    <ChallengeItem>
                      <ChallengeItem.Image
                        imgSrc={makeBase64IncodedImage({
                          uri: item.fileResponse.encodedFile,
                          format: "jpg",
                        })}
                        alt={"챌린지 이미지"}
                        direction="vertical"
                      >
                        {item.certificateStatus === "패스 완료" && (
                          <ChallengeItem.Overlay text="패 스" />
                        )}
                        {item.certificateStatus === "인증 갱신" && (
                          <ChallengeItem.Overlay />
                        )}

                        {item.certificateStatus === "인증 갱신" && (
                          <img
                            src={successStamp}
                            alt="성공 스탬프"
                            className="bottom-[1rem] right-[1rem] absolute "
                          />
                        )}
                      </ChallengeItem.Image>
                    </ChallengeItem>
                  </div>
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                    repositoryName={item.repository}
                  />
                </MyChallengeLinkWrap>

                <div className="w-full max-w-[24.8rem] flex flex-col items-center self-end">
                  <MyChallengePassItem
                    passCount={item.numOfPassItem}
                    onClick={() => onClickPassItem(item.instanceId)}
                  />

                  {item.certificateStatus === "인증 갱신" ||
                  item.certificateStatus === "인증하기" ? (
                    <MyChallengeLabel
                      labelText={item.certificateStatus}
                      onClick={() => reNewCertification(item.instanceId)}
                    />
                  ) : (
                    <MyChallengeLabel labelText={item.certificateStatus} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeProgress;
