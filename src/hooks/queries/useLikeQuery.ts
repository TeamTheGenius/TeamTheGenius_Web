import deleteLikeChallenge from "@/apis/deleteLikeChallenge";
import getLikeChallenges from "@/apis/getLikeChallenges";
import postLikeChallenge from "@/apis/postLikeChallenge";
import { QUERY_KEY } from "@/constants/queryKey";
import { AxiosError } from "axios";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

export const useGetInfiniteLikedChallenges = () => {
  const { fetchNextPage, hasNextPage, refetch, isLoading, data } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.INFINITE_MY_LIKED_CHALLENGES],
      queryFn: ({ pageParam = 0 }) =>
        getLikeChallenges({ pageParams: pageParam, size: 20 }),
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
    });
  return { fetchNextPage, hasNextPage, refetch, isLoading, data };
};

interface PostLikesChallengeType {
  onError: (error: AxiosError<{ message?: string }>) => void;
}

export const usePostLikesChallenge = ({ onError }: PostLikesChallengeType) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (instanceId: number) => postLikeChallenge({ instanceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        onError(error);
      },
    }
  );
  return { mutate };
};

interface DeleteLikesChallengeType {
  onError: (error: AxiosError<{ message?: string }>) => void;
}

export const useDeleteLikesChallenge = ({
  onError,
}: DeleteLikesChallengeType) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (likesId: number) => deleteLikeChallenge({ likesId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        queryClient.invalidateQueries(QUERY_KEY.INFINITE_MY_LIKED_CHALLENGES);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        onError(error);
      },
    }
  );
  return { mutate };
};
