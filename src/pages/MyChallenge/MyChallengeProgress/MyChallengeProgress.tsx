import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import successStamp from "@/assets/icon/success-stamp.svg";
import getMyChallengeActivity from "@/apis/getMyChallengeActivity";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery, useQueryClient } from "react-query";
import MyChallengePassItem from "@/components/Main/MyChallenge/MyChallengePass/MyChallengePassItem";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { getToday } from "@/utils/getToday";
import CertificationPassModal from "@/components/Main/MyChallenge/MyChallengeModal/CertificationPassModal/CertificationPassModal";
import CertificationFailModal from "@/components/Certification/CertificationModal/CertificationFailModal/CertificationFailModal";
import { QUERY_KEY } from "@/constants/queryKey";
import { usePostTodayCertification } from "@/hooks/queries/useCertificationQuery";
import { CertificationDataType } from "@/types/certificationType";

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  repository: string;
  certificateStatus: "패스 완료" | "인증 갱신" | "인증하기";
  numOfPassItem: number;
  canUsePassItem: boolean;
  itemId: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

interface PassItemModal {
  e: React.MouseEvent;
  instanceId: number;
  numOfPassItem: number;
  itemId: number;
}

const MyChallengeProgress = () => {
  const { isModalOpened, openModal, closeModal } = useModal();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<React.ReactNode>();
  const { data } = useQuery<Data[]>({
    queryKey: [QUERY_KEY.MY_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengeActivity(),
    suspense: true,
  });
  const onSuccessPostTodayCertification = (res: CertificationDataType) => {
    if (res.certificateStatus === "NOT_YET") {
      setModal(<CertificationFailModal closeModal={closeModal} />);
      openModal();
    } else {
      queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
    }
  };
  const { mutate: postTodayCertificationMutate } = usePostTodayCertification({
    onSuccess: onSuccessPostTodayCertification,
  });

  if (!data) {
    return;
  }

  const onClickPassItem = ({
    e,
    instanceId,
    numOfPassItem,
    itemId,
  }: PassItemModal) => {
    e.stopPropagation();
    setModal(
      <CertificationPassModal
        closeModal={closeModal}
        instanceId={instanceId}
        numOfPassItem={numOfPassItem}
        itemId={itemId}
      />
    );
    openModal();
  };

  const reNewCertification = async (
    e: React.MouseEvent,
    instanceId: number
  ) => {
    e.stopPropagation();
    postTodayCertificationMutate({
      instanceId: instanceId,
      targetDate: getToday(),
    });
  };

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}

      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li key={index} className=" mb-[1.3rem] list-none">
              <MyChallengeLinkWrap instanceId={item.instanceId}>
                <div className="min-w-[16.4rem] w-[16.4rem]">
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
                          className="bottom-[1rem] right-[1rem] absolute"
                        />
                      )}
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>
                <div className="w-full justify-between flex flex-col ">
                  <MyChallengeTitle
                    title={item.title}
                    point={item.pointPerPerson}
                    repositoryName={item.repository}
                  />
                  {item.canUsePassItem &&
                    item.certificateStatus == "인증하기" && (
                      <MyChallengePassItem
                        passCount={item.numOfPassItem}
                        onClick={(e: React.MouseEvent) =>
                          onClickPassItem({
                            e: e,
                            instanceId: item.instanceId,
                            numOfPassItem: item.numOfPassItem,
                            itemId: item.itemId,
                          })
                        }
                      />
                    )}
                  {item.certificateStatus === "인증 갱신" ||
                  item.certificateStatus === "인증하기" ? (
                    <MyChallengeLabel
                      labelText={item.certificateStatus}
                      onClick={(e: React.MouseEvent) =>
                        reNewCertification(e, item.instanceId)
                      }
                    />
                  ) : (
                    <MyChallengeLabel labelText={item.certificateStatus} />
                  )}
                </div>
              </MyChallengeLinkWrap>
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeProgress;
