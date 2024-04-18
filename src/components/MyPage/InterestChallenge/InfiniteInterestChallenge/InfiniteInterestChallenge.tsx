import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { PATH } from "@/constants/path";
import {
  useDeleteLikesChallenge,
  useGetInfiniteLikedChallenges,
} from "@/hooks/queries/useLikeQuery";
import { encrypt } from "@/hooks/useCrypto";
import useModal from "@/hooks/useModal";
import { LikedChallengeDataType } from "@/types/likeType";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function InfiniteInterestChallenge() {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<LikedChallengeDataType[]>([]);
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  const onErrorDeleteLikesChallenge = (
    error: AxiosError<{ message: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
    openModal();
  };
  const { mutate: deleteLikesChallenges } = useDeleteLikesChallenge({
    onError: onErrorDeleteLikesChallenge,
  });
  const { fetchNextPage, hasNextPage, isLoading } =
    useGetInfiniteLikedChallenges({ setChallenges: setChallenges });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!challenges) return null;

  const onClickChallengeItem = (instanceId: number) => {
    navigate(`${PATH.CHALLENGE_DETAIL}/${encrypt(instanceId)}`);
  };

  const onClickHeart = async (e: React.MouseEvent, likesId: number) => {
    e.stopPropagation();
    deleteLikesChallenges(likesId);
  };

  if (isLoading) return <LoadingBox />;
  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}
      <div className="pt-[9rem] _sm:pt-[7.6rem] w-full max-w-[51.5rem] _sm:max-w-[34.9rem] grid grid-cols-3 gap-x-[1rem] _sm:grid-cols-2">
        {challenges.map((item, index) => (
          <div className="pb-[1.8rem]" key={index}>
            <ChallengeItem
              onClick={() => onClickChallengeItem(item.instanceId)}
            >
              <ChallengeItem.Image
                imgSrc={makeBase64IncodedImage({
                  uri: item.fileResponse.encodedFile,
                  format: "jpg",
                })}
                alt={"챌린지 이미지"}
                direction="vertical"
                maxWidth="max-w-[16.5rem]"
                paddingBottom="pb-[72.7%]"
              >
                <ChallengeItem.Heart
                  onClick={(e) => onClickHeart(e, item.likesId)}
                />
              </ChallengeItem.Image>
              <ChallengeItem.Title title={item.title} />
              <ChallengeItem.Reward point={item.pointPerPerson} />
            </ChallengeItem>
          </div>
        ))}
        <div ref={ref} style={{ height: "10px", background: "transparent" }} />
      </div>
    </>
  );
}

export default InfiniteInterestChallenge;
