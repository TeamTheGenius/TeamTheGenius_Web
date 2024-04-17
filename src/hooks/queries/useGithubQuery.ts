import getGithubTokenApi from "@/apis/getGithubTokenApi";
import getPullRequestVerifyApi from "@/apis/getPullRequestVerifyApi";
import getRepoVertifyApi from "@/apis/getRepoVertifyApi";
import getUserRepoApi from "@/apis/getUserRepoApi";
import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
import { QUERY_KEY } from "@/constants/queryKey";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface PostTokenRegisterType {
  onSuccess: () => void;
  onError: (err: AxiosError<{ message: string }>) => void;
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
      onError: (err: AxiosError<{ message: string }>) => {
        onError(err);
      },
      useErrorBoundary: false,
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

interface GetVerifyRepositoryMutateType {
  repo: string;
}
interface GetVerifyRepositoryType {
  onSuccess: (res: AxiosResponse) => void;
  onError: (err: AxiosError<{ message: string }>) => void;
}
export const useGetVerifyRepository = ({
  onSuccess,
  onError,
}: GetVerifyRepositoryType) => {
  const { mutate } = useMutation(
    ({ repo }: GetVerifyRepositoryMutateType) => getRepoVertifyApi({ repo }),
    {
      onSuccess: (res: AxiosResponse) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message: string }>) => {
        onError(err);
      },
      useErrorBoundary: false,
    }
  );
  return { mutate };
};

interface GetVerifyPullRequestMutateType {
  repo: string;
}
interface GetVerifyPullRequestType {
  onSuccess: () => void;
  onError: (err: AxiosError<{ message: string }>) => void;
}
export const useGetVerifyPullRequest = ({
  onSuccess,
  onError,
}: GetVerifyPullRequestType) => {
  const { mutate } = useMutation(
    ({ repo }: GetVerifyPullRequestMutateType) =>
      getPullRequestVerifyApi({ repo }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError<{ message: string }>) => {
        onError(err);
      },
      useErrorBoundary: false,
    }
  );
  return { mutate };
};

interface GetRepositoriesType {
  githubTokenOk: string | undefined;
}
export const useGetRepositories = ({ githubTokenOk }: GetRepositoriesType) => {
  const { data } = useQuery<string[]>({
    queryKey: [QUERY_KEY.GITHUB_REPOSITORIES],
    queryFn: getUserRepoApi,
    enabled: githubTokenOk === "OK",
  });
  return { data };
};
