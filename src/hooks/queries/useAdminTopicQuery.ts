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
        setTotalNumber,
      }),
    keepPreviousData: true,
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
  });
  return { data };
};

interface useMutateType {
  onSuccess: (res: string) => void;
  onError: (errorMessage: string) => void;
}
export const usePostTopicCreate = ({ onSuccess, onError }: useMutateType) => {
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
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
export const usePostTopicFileCreate = ({
  onSuccess,
  onError,
}: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({ topicFile, topicId }: topicFileApiType) =>
      postAdminTopicFileApi({
        topicFile: topicFile,
        topicId: topicId,
      }),
    {
      onSuccess: (res: any) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
export const usePatchTopicEdit = ({ onSuccess, onError }: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      setIsLoading,
      topicId,
      topicTitle,
      topicNotice,
      topicDesc,
      topicTags,
      topicPoint,
    }: adminTopicEditApiType) =>
      patchAdminTopicEditApi({
        setIsLoading: setIsLoading,
        topicId: topicId,
        topicTitle: topicTitle,
        topicDesc: topicDesc,
        topicNotice: topicNotice,
        topicTags: topicTags,
        topicPoint: topicPoint,
      }),
    {
      onSuccess: (res: any) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
export const usePatchTopicFileEdit = ({
  onSuccess,
  onError,
}: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({ topicFile, topicId }: topicFileApiType) =>
      patchAdminTopicEditFileApi({
        topicId: topicId,
        topicFile: topicFile,
      }),
    {
      onSuccess: (res: any) => {
        onSuccess(res);
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
