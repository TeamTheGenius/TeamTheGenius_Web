import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import Header from "@/components/Common/Header/Header";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import { PATH } from "@/constants/path";
import {
  useDeleteLikesChallenge,
  useGetInfiniteLikedChallenges,
} from "@/hooks/queries/useLikeQuery";
import { encrypt } from "@/hooks/useCrypto";
import { LikedChallengeDataType } from "@/types/likeType";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function InterestChallenge() {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<LikedChallengeDataType[]>([]);
  const navigate = useNavigate();

  const { mutate: deleteLikesChallenges } = useDeleteLikesChallenge();
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

  return (
    <MobCard>
      <Header content="좋아요 목록" />
      {isLoading ? (
        <LoadingBox />
      ) : (
        <div className="px-[2.2rem] flex justify-center items-center">
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
            <div
              ref={ref}
              style={{ height: "10px", background: "transparent" }}
            />
          </div>
        </div>
      )}
    </MobCard>
  );
}

export default InterestChallenge;
