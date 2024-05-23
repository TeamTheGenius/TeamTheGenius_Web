import deleteChallengeParticipation from "@/apis/deleteChallengeParticipation";
import getInstanceDetail from "@/apis/getInstanceDetail";
import postChallengeRepoRegiApi from "@/apis/postChallengeRepoRegiApi";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { PATH } from "@/constants/path";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import { ChallengeDetailDataType } from "@/types/instanceDetail";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../useCrypto";

export const useGetChallengeDetail = (decryptId: number) => {
  const { data, refetch, isLoading } = useQuery<ChallengeDetailDataType>({
    queryKey: [QUERY_KEY.CHALLENGE_INSTANCE_DETAIL, { decryptId }],
    queryFn: () => getInstanceDetail({ instanceId: decryptId }),
  });
  return { data, refetch, isLoading };
};

interface PostChallengeJoinMutateType {
  instanceId: number;
  repo: string;
}
export const usePostChallengeJoin = () => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    ({ instanceId, repo }: PostChallengeJoinMutateType) =>
      postChallengeRepoRegiApi({ instanceId, repo }),
    {
      onSuccess: (_, variables) => {
        const { instanceId } = variables;
        const encryptedInstanceId = encrypt(instanceId);
        navigate(`${PATH.CHALLENGE_DETAIL}/${encryptedInstanceId}`, {
          replace: true,
        });
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate, isLoading };
};

interface DeleteChallengeJoinType {
  onSuccess: () => void;
}
interface DeleteChallengeJoinMutateType {
  instanceId: number;
}
export const useDeleteChallengeJoin = ({
  onSuccess,
}: DeleteChallengeJoinType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId }: DeleteChallengeJoinMutateType) =>
      deleteChallengeParticipation({ instanceId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CHALLENGE_INSTANCE_DETAIL);
        onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate, isLoading };
};
