import deleteChallengeParticipation from "@/apis/deleteChallengeParticipation";
import getInstanceDetail from "@/apis/getInstanceDetail";
import postChallengeRepoRegiApi from "@/apis/postChallengeRepoRegiApi";
import { PATH } from "@/constants/path";
import { QUERY_KEY } from "@/constants/queryKey";
import { ChallengeDetailDataType } from "@/types/instanceDetail";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetChallengeDetail = (decryptId: number) => {
  const { data, refetch, isLoading } = useQuery<ChallengeDetailDataType>({
    queryKey: [QUERY_KEY.CHALLENGE_INSTANCE_DETAIL, { decryptId }],
    queryFn: () => getInstanceDetail({ instanceId: decryptId }),
    suspense: true,
  });
  return { data, refetch, isLoading };
};

interface PostChallengeJoinType {
  onSuccess: () => void;
  onError: (error: AxiosError<{ message: string }>) => void;
}
interface PostChallengeJoinMutateType {
  instanceId: number;
  repo: string;
}
export const usePostChallengeJoin = ({
  onSuccess: onSuccess,
  onError: onError,
}: PostChallengeJoinType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    ({ instanceId, repo }: PostChallengeJoinMutateType) =>
      postChallengeRepoRegiApi({ instanceId, repo }),
    {
      onSuccess: () => {
        navigate(PATH.HOME);
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        onSuccess();
      },
      onError: (error: AxiosError<{ message: string }>) => {
        onError(error);
      },
    }
  );
  return { mutate };
};

interface DeleteChallengeJoinType {
  onSuccess: () => void;
  onError: (error: AxiosError<{ message: string }>) => void;
}
interface DeleteChallengeJoinMutateType {
  instanceId: number;
}
export const useDeleteChallengeJoin = ({
  onSuccess,
  onError,
}: DeleteChallengeJoinType) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId }: DeleteChallengeJoinMutateType) =>
      deleteChallengeParticipation({ instanceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        onSuccess();
      },
      onError: (error: AxiosError<{ message: string }>) => onError(error),
    }
  );
  return { mutate, isLoading };
};
