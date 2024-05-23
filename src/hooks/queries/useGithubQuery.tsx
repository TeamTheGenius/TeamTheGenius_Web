import getGithubTokenApi from "@/apis/getGithubTokenApi";
import getPullRequestVerifyApi from "@/apis/getPullRequestVerifyApi";
import getRepoVertifyApi from "@/apis/getRepoVertifyApi";
import getUserRepoApi from "@/apis/getUserRepoApi";
import postGithubTokenRegi from "@/apis/postGithubTokenRegi";
import CommonModal from "@/components/Common/CommonModal/CommonModal";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface PostTokenRegisterType {
  onSuccess: () => void;
  onError: (err: AxiosError<{ message?: string }>) => void;
}
interface PostTokenRegisterMutateType {
  githubToken: string;
}
export const usePostTokenRegister = ({
  onSuccess,
  onError,
}: PostTokenRegisterType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ githubToken }: PostTokenRegisterMutateType) =>
      postGithubTokenRegi({ githubToken }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
        onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        if (error.response?.data.message === "Github 연결이 실패했습니다.") {
          setModal(
            <CommonModal
              content={
                "Github 연결에 실패하셨습니다.\n유효한 Token을 등록해주세요"
              }
              buttonContent="확인"
              onClick={closeModal}
            />
          );
        } else {
          setModal(
            <CommonMutationErrorModal closeModal={closeModal} error={error} />
          );
        }
        onError(error);
      },
    }
  );
  return { mutate, isLoading };
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
  onSuccess: () => void;
  onError: () => void;
}
export const useGetVerifyRepository = ({
  onSuccess,
}: GetVerifyRepositoryType) => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading } = useMutation(
    ({ repo }: GetVerifyRepositoryMutateType) => getRepoVertifyApi({ repo }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal closeModal={closeModal} error={error} />
        );
      },
    }
  );
  return { mutate, isLoading };
};

interface GetVerifyPullRequestMutateType {
  repo: string;
}
interface GetVerifyPullRequestType {
  onSuccess: () => void;
  onError: () => void;
}
export const useGetVerifyPullRequest = ({
  onSuccess,
  onError,
}: GetVerifyPullRequestType) => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading } = useMutation(
    ({ repo }: GetVerifyPullRequestMutateType) =>
      getPullRequestVerifyApi({ repo }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        if (
          err?.response?.data?.message ===
          "해당 레포지토리에 PR이 존재하지 않습니다."
        ) {
          setModal(
            <CommonModal
              buttonContent="확인"
              content={
                "해당 레포지토리에 PR이 존재하지 않습니다. PR 요청 후 다시 시도해주세요"
              }
              onClick={closeModal}
            />
          );
        } else {
          setModal(
            <CommonMutationErrorModal closeModal={closeModal} error={err} />
          );
        }

        onError();
      },
    }
  );

  return { mutate, isLoading };
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
