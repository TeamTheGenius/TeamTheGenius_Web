import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
import { QUERY_KEY } from "@/constants/queryKey";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";

interface PostTokenRegisterType {
  onSuccess: () => void;
  onError: (err: string) => void;
}
interface PostTokenRegisterMutateType {
  githubToken: string;
}
export const usePostTokenRegister = ({
  onSuccess,
  onError,
}: PostTokenRegisterType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ githubToken }: PostTokenRegisterMutateType) =>
      postGithubTokenRegi({ githubToken }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
        onSuccess();
      },
      onError: (err: AxiosError) => {
        onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate };
};
