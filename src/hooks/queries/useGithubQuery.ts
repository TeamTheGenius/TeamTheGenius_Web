import getGithubTokenApi from "@/apis/getGithubTokenApi";
import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
import { QUERY_KEY } from "@/constants/queryKey";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const useGetTokenVerify = () => {
  const { data } = useQuery<string>({
    queryKey: [QUERY_KEY.GITHUB_TOKEN],
    queryFn: getGithubTokenApi,
    useErrorBoundary: false,
  });
  return { data };
};
