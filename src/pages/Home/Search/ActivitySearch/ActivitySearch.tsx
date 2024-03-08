import getSearchedChallengeItem from "@/apis/getSearchedChallengeItem";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useOutletContext } from "react-router-dom";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

interface Outlet {
  searchQuery: string;
  searchEnter: boolean;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActivitySearch() {
  const { searchQuery, searchEnter, setSearchEnter } =
    useOutletContext<Outlet>();

  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["getSearchedChallenge", "activity"],
    queryFn: ({ pageParam = 0 }) =>
      getSearchedChallengeItem({
        pageParams: pageParam,
        size: 15,
        keyword: searchQuery,
        progress: "ACTIVITY",
      }),
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

  useEffect(() => {
    if (searchEnter) {
      refetch();
      setSearchEnter(false);
    }
  }, [searchEnter]);

  if (!challenges) return null;

  return (
    <>
      <VerticalChallengeItems data={challenges} />
      <div ref={ref} style={{ height: "10px" }}></div>
    </>
  );
}

export default ActivitySearch;
