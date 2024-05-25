import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import getAdminTopicListPageApi from "@/apis/getAdminTopicListPageApi";
import patchAdminTopicEditApi from "@/apis/patchAdminTopicEditApi";
import patchAdminTopicEditFileApi from "@/apis/patchAdminTopicEditFileApi";
import postAdminTopicApi from "@/apis/postAdminTopicApi";
import postAdminTopicFileApi from "@/apis/postAdminTopicFileApi";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  adminTopicEditApiType,
  topicCreateApiType,
  topicFileApiType,
  topicPatchFileApiType,
} from "@/types/adminType";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

type useTopicListQueryType = {
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};
type useTopicDetailQueryType = {
  topicId?: number;
};
export const useTopicListQuery = ({
  pageNumber,
  setTotalNumber,
}: useTopicListQueryType) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEY.ADMIN_TOPIC_PAGE, pageNumber],
    queryFn: () =>
      getAdminTopicListPageApi({
        pageNumber: pageNumber,
      }),
    keepPreviousData: true,
    suspense: true,
    onSuccess: (data) => {
      if (setTotalNumber) {
        setTotalNumber(data.totalElements);
      }
    },
  });
  return { data };
};
export const useTopicDetailQuery = ({ topicId }: useTopicDetailQueryType) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEY.ADMIN_TOPIC_DETAIL],
    queryFn: () =>
      getAdminDetailTopicApi({
        topicId: topicId,
      }),
    suspense: true,
  });

  return { data };
};

interface PostTopicCreateType {
  onSuccess: (res: any) => void;
}

export const usePostTopicCreate = ({ onSuccess }: PostTopicCreateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      topicTitle,
      topicNotice,
      topicDesc,
      topicTags,
      topicPoint,
    }: topicCreateApiType) =>
      postAdminTopicApi({
        topicTitle: topicTitle,
        topicDesc: topicDesc,
        topicNotice: topicNotice,
        topicTags: topicTags,
        topicPoint: topicPoint,
      }),
    {
      onSuccess: (res) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};

interface PostTopicFileCreateType {
  onSuccess: (res: any) => void;
}

export const usePostTopicFileCreate = ({
  onSuccess,
}: PostTopicFileCreateType) => {
  const { mutate, isLoading } = useMutation(
    ({ topicFile, topicId }: topicFileApiType) =>
      postAdminTopicFileApi({
        topicId: topicId,
        topicFile: topicFile,
      }),
    {
      onSuccess: (res) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};
type useMutatePatchTopicEditType = {
  onSuccess: () => void;
};

export const usePatchTopicEdit = ({
  onSuccess,
}: useMutatePatchTopicEditType) => {
  const { mutate, isLoading } = useMutation(
    ({
      topicId,
      topicTitle,
      topicNotice,
      topicDesc,
      topicTags,
      topicPoint,
    }: adminTopicEditApiType) =>
      patchAdminTopicEditApi({
        topicId: topicId,
        topicTitle: topicTitle,
        topicDesc: topicDesc,
        topicNotice: topicNotice,
        topicTags: topicTags,
        topicPoint: topicPoint,
      }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};

type PatchTopicFileEditType = {
  onSuccess: (res: any) => void;
};

export const usePatchTopicFileEdit = ({
  onSuccess,
}: PatchTopicFileEditType) => {
  const { mutate, isLoading } = useMutation(
    ({ topicFile, topicId }: topicPatchFileApiType) =>
      patchAdminTopicEditFileApi({
        topicId: topicId,
        topicFile: topicFile,
      }),
    {
      onSuccess: (res: any) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};
