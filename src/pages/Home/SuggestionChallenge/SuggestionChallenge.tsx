import { useEffect, useState } from "react";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useInView } from "react-intersection-observer";
import getRecommendedChallenge from "@/apis/getRecommendedChallenge";
import { useInfiniteQuery } from "react-query";
import Loading from "@/components/Common/Loading/Loading";

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
    queryKey: ["getRecommendedChallenges"],
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
        <Loading />
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
