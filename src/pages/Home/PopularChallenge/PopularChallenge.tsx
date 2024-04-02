import { useEffect, useState } from "react";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import getPopularChallenge from "@/apis/getPopularChallenge";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

const PopularChallenge = () => {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["getPopularChallenges"],
    queryFn: ({ pageParam = 0 }) =>
      getPopularChallenge({ pageParams: pageParam, size: 20 }),
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

export default PopularChallenge;
