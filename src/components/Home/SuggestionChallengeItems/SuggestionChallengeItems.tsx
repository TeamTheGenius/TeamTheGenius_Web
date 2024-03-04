import Title from "../Title/Title";
import MoreButton from "../MoreButton/MoreButton";
import { PATH } from "@/constants/path";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { useNavigate } from "react-router-dom";
import getRecommendedChallenge from "@/apis/getRecommendedChallenge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";

interface Post {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

interface Data {
  posts: Post[];
}

function SuggestionChallengeItems() {
  const [clickPossible, setClickPossible] = useState<boolean>(true);
  const navigate = useNavigate();
  const { data } = useQuery<Data>({
    queryKey: ["recommendedChallenges"],
    queryFn: () => getRecommendedChallenge({ pageParams: 0, size: 7 }),
  });

  const onClick = (id: number, clickPossible: boolean) => {
    if (clickPossible) {
      navigate(`${PATH.CHALLENGE_DETAIL}/${id}`);
    }
  };

  return (
    <div>
      <div className="flex gap-[2.851rem] _sm:justify-between items-center pr-[2.2rem] mb-[1.5rem]">
        <Title content="추천 챌린지" />
        <MoreButton path={PATH.SUGGESTION_CHALLENGE} />
      </div>

      <HorizontalScroll setClickPossible={setClickPossible}>
        <div className="max-w-[18.8rem] flex gap-[2.2rem]">
          {Array.isArray(data?.posts) &&
            data.posts.map(
              (item, index) =>
                index < 7 && (
                  <div key={index} className="my-[0.4rem] ">
                    <ChallengeItem
                      onClick={() => onClick(item.instanceId, clickPossible)}
                    >
                      <ChallengeItem.Image
                        imgSrc={makeBase64IncodedImage({
                          uri: item.fileResponse.encodedFile,
                          format: "jpg",
                        })}
                        alt="챌린지 사진"
                        direction="horizontal"
                      >
                        <ChallengeItem.NumberOfParticipant
                          numberOfParticipants={item.participantCnt}
                        />
                      </ChallengeItem.Image>
                      <ChallengeItem.Title title={item.title} />
                      <ChallengeItem.Reward point={item.pointPerPerson} />
                    </ChallengeItem>
                  </div>
                )
            )}
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default SuggestionChallengeItems;
