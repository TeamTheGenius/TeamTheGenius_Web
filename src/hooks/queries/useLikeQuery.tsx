import deleteLikeChallenge from "@/apis/deleteLikeChallenge";
import getLikeChallenges from "@/apis/getLikeChallenges";
import postLikeChallenge from "@/apis/postLikeChallenge";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
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

export const usePostLikesChallenge = () => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (instanceId: number) => postLikeChallenge({ instanceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate };
};

export const useDeleteLikesChallenge = () => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (likesId: number) => deleteLikeChallenge({ likesId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        queryClient.invalidateQueries(QUERY_KEY.INFINITE_MY_LIKED_CHALLENGES);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate };
};
