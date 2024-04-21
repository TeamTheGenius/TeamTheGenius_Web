import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import getAdminTopicListPageApi from "@/apis/getAdminTopicListPageApi";
import patchAdminTopicEditApi from "@/apis/patchAdminTopicEditApi";
import postAdminTopicApi from "@/apis/postAdminTopicApi";
import { QUERY_KEY } from "@/constants/queryKey";
import { adminTopicEditApiType, topicCreateApiType } from "@/types/adminType";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

type useTopicListQueryType = {
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
  // setTotalNumber: (total: number) => void;
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
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
}
export const usePostTopicCreate = ({ onSuccess, onError }: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      topicTitle,
      topicNotice,
      topicDesc,
      topicTags,
      topicFile,
      topicPoint,
    }: topicCreateApiType) =>
      postAdminTopicApi({
        topicTitle: topicTitle,
        topicDesc: topicDesc,
        topicNotice: topicNotice,
        topicTags: topicTags,
        topicFile: topicFile,
        topicPoint: topicPoint,
      }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
export const usePatchTopicCreate = ({ onSuccess, onError }: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      setIsLoading,
      topicId,
      topicTitle,
      topicNotice,
      topicDesc,
      topicTags,
      topicFile,
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
        topicFile: topicFile,
      }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
