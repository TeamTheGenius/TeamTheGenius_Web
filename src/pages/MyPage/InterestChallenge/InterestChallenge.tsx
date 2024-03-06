import deleteLikeChallenge from "@/apis/deleteLikeChallenge";
import getLikeChallenges from "@/apis/getLikeChallenges";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { PATH } from "@/constants/path";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

function InterestChallenge() {
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);
  const navigate = useNavigate();

  const loadChallenges = async () => {
    const newData = await getLikeChallenges({ pageParams: page, size: 20 });
    setChallenges([...challenges, ...newData.posts]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadChallenges();
    }
  }, [inView]);

  const onClickChallengeItem = (instanceId: number) => {
    navigate(`${PATH.CHALLENGE_DETAIL}/${instanceId}`);
  };

  const onClickHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteLikeChallenge({ likesId: 4 });
  };

  return (
    <MobCard>
      <Header content="관심사 수정" />
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
                  <ChallengeItem.Heart onClick={onClickHeart} />
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
    </MobCard>
  );
}

export default InterestChallenge;
