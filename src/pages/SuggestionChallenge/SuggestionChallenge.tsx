import getRecommendedChallenge from "@/apis/getRecommendedChallenge";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { allChallengeData } from "@/data/allChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useQuery } from "@tanstack/react-query";

function SuggestionChallenge() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["recommendedChallenges"],
    queryFn: () => getRecommendedChallenge({ page: 0, size: 20 }),
  });
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={allChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default SuggestionChallenge;
