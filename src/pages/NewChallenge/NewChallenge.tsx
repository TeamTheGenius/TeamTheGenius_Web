import getLatestChallenge from "@/apis/getLatestChallenge";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { allChallengeData } from "@/data/allChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useQuery } from "@tanstack/react-query";

function NewChallenge() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["latestChallenges"],
    queryFn: () => getLatestChallenge({ page: 0, size: 20 }),
  });

  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={allChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default NewChallenge;
