import { useEffect, useState } from "react";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useInView } from "react-intersection-observer";
import getRecommendedChallenge from "@/apis/getRecommendedChallenge";
import { useInfiniteQuery } from "react-query";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { QUERY_KEY } from "@/constants/queryKey";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

const SuggestionChallenge = () => {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_RECOMMENDED_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getRecommendedChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const challenges = res.pages.map((page) => page.posts).flat();
      setChallenges(challenges);
    },
    cacheTime: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!challenges) return;

  return (
    <HomeLayout>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <div className="mx-[2.2rem] mt-[1rem]">
          <VerticalChallengeItems data={challenges} />
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
        </div>
      )}
    </HomeLayout>
  );
};

export default SuggestionChallenge;
