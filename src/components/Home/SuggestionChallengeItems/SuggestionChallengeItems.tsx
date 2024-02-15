import Title from "../Title/Title";
import MoreButton from "../MoreButton/MoreButton";
import { PATH } from "@/constants/path";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import { allChallengeData } from "@/data/allChallengeData";
import { useNavigate } from "react-router-dom";
import getRecommendedChallenge from "@/apis/getRecommendedChallenge";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading/Loading";
import Error from "@/components/Error/ErrorHeader/ErrorHeader";
import { useState } from "react";

function SuggestionChallengeItems() {
  const [clickPossible, setClickPossible] = useState<boolean>(true);
  /*
  useEffect(() => {
    getRecommendedChallenge({ page: 0, size: 7 });
  }, []);
  */
  const navigate = useNavigate();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["recommendedChallenges"],
    queryFn: () => getRecommendedChallenge({ page: 0, size: 7 }),
  });

  const onClick = (id: number, clickPossible: boolean) => {
    if (clickPossible) {
      navigate(`${PATH.CHALLENGE_DETAIL}/${id}`);
    } else {
      setClickPossible(true);
      return;
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
          {allChallengeData.map(
            (item, index) =>
              index < 7 && (
                <div key={index} className="my-[0.4rem] ">
                  <ChallengeItem
                    key={index}
                    onClick={() => onClick(item.id, clickPossible)}
                  >
                    <ChallengeItem.Image
                      imgSrc={item.imgSrc}
                      alt={item.alt}
                      direction="horizontal"
                    >
                      <ChallengeItem.NumberOfParticipant
                        numberOfParticipants={item.numberOfParticipants}
                      />
                    </ChallengeItem.Image>
                    <ChallengeItem.Title title={item.title} />
                    <ChallengeItem.Reward point={item.point} />
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
