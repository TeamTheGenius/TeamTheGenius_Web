import deleteLikeChallenge from "@/apis/deleteLikeChallenge";
import getLikeChallenges from "@/apis/getLikeChallenges";
import postLikeChallenge from "@/apis/postLikeChallenge";
import { QUERY_KEY } from "@/constants/queryKey";
import { LikedChallengeDataType } from "@/types/likeType";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

interface GetInfiniteLikedChallengesDataType {
  setChallenges: React.Dispatch<React.SetStateAction<LikedChallengeDataType[]>>;
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

export const usePostLikesChallenge = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (instanceId: number) => postLikeChallenge({ instanceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
      },
    }
  );
  return { mutate };
};

export const useDeleteLikesChallenge = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (likesId: number) => deleteLikeChallenge({ likesId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        queryClient.invalidateQueries(QUERY_KEY.INFINITE_MY_LIKED_CHALLENGES);
      },
    }
  );
  return { mutate };
};
