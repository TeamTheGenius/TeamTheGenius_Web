import { useEffect, useState } from "react";
import getLatestChallenge from "@/apis/getLatestChallenge";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useInView } from "react-intersection-observer";
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

const NewChallenge = () => {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["getLastestChallenges"],
    queryFn: ({ pageParam = 0 }) =>
      getLatestChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!challenges) return null;

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

export default NewChallenge;
