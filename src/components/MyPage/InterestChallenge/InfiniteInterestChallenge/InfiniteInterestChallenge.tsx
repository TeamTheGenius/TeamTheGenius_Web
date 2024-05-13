import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
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
import { InstanceThumbnailDataType } from "@/types/homeInstance";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function InfiniteInterestChallenge() {
  const [ref, inView] = useInView();
  const [modal, setModal] = useState<React.ReactNode>();
  const { isModalOpened, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  const onErrorDeleteLikesChallenge = (
    error: AxiosError<{ message?: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
    openModal();
  };
  const { mutate: deleteLikesChallenges } = useDeleteLikesChallenge({
    onError: onErrorDeleteLikesChallenge,
  });
  const { fetchNextPage, hasNextPage, isLoading, data } =
    useGetInfiniteLikedChallenges();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
      <div className="pt-[6rem] pb-[2rem] w-full">
        {!data?.pages[0].posts.length && (
          <div className="mt-[8rem]">
            <EmptyDataView>
              <EmptyDataView.HeartHatchIcon />
              <EmptyDataView.Title title="관심목록이 비었어요" />
              <EmptyDataView.SubTitle subTitle="좋아하는 챌린지에 ♥를 눌러주세요." />
              <EmptyDataView.Button label="챌린지 구경가기" path={PATH.HOME} />
            </EmptyDataView>
          </div>
        )}
        {!!data?.pages[0].posts.length && (
          <div className="pt-[3rem] _sm:pt-[1.6rem] w-full max-w-[51.5rem] _sm:max-w-[34.9rem] grid grid-cols-3 gap-x-[1rem] _sm:grid-cols-2">
            {data?.pages.map((page, pageIndex) =>
              page.posts.map(
                (post: InstanceThumbnailDataType, postIndex: number) => (
                  <div
                    className="pb-[1.8rem]"
                    key={`${pageIndex}-${postIndex}`}
                  >
                    <ChallengeItem
                      onClick={() => onClickChallengeItem(post.instanceId)}
                    >
                      <ChallengeItem.Image
                        imgSrc={makeBase64IncodedImage({
                          uri: post.fileResponse.encodedFile,
                          format: "jpg",
                        })}
                        alt={"챌린지 이미지"}
                        direction="vertical"
                        maxWidth="max-w-[16.5rem]"
                        paddingBottom="pb-[72.7%]"
                      >
                        <ChallengeItem.Heart
                          onClick={(e) => onClickHeart(e, post.likesId)}
                        />
                      </ChallengeItem.Image>
                      <ChallengeItem.Title title={post.title} />
                      <ChallengeItem.Reward point={post.pointPerPerson} />
                    </ChallengeItem>
                  </div>
                )
              )
            )}
            <div
              ref={ref}
              style={{ height: "10px", background: "transparent" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default InfiniteInterestChallenge;
