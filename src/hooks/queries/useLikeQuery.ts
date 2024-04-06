import getLikeChallenges from "@/apis/getLikeChallenges";
import { QUERY_KEY } from "@/constants/queryKey";
import { useInfiniteQuery } from "react-query";

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
  likesId: number;
}

interface GetInfiniteLikedChallengesDataType {
  setChallenges: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const useGetInfiniteLikedChallenges = ({
  setChallenges,
}: GetInfiniteLikedChallengesDataType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_MY_LIKED_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getLikeChallenges({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, refetch, isLoading };
};

export const usePostLikesChallenge = () => {};

export const useDeleteLikesChallenge = () => {};
