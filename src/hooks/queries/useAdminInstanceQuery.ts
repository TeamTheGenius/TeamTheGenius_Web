import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";
import getAdminInstanceListPageApi from "@/apis/getAdminInstanceListApi";
import patchAdminInstanceEditApi from "@/apis/patchAdminInstanceEditApi";
import postAdminInstanceApi from "@/apis/postAdminInstanceApi";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  editInstacneQueryType,
  instanceCreateApiType,
} from "@/types/adminType";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

type useInstanceListQueryType = {
  pageNumber?: number;
  setTotalNumber?: React.Dispatch<React.SetStateAction<number>>;
};
type useInstanceDetailQueryType = {
  instanceId?: number;
};
export const useInstanceListQuery = ({
  pageNumber,
  setTotalNumber,
}: useInstanceListQueryType) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEY.ADMIN_INSTANCE_PAGE, pageNumber],
    queryFn: () =>
      getAdminInstanceListPageApi({
        pageNumber: pageNumber,
        setTotalNumber,
      }),
    keepPreviousData: true,
  });
  return { data };
};
export const useInstanceDetailQuery = ({
  instanceId,
}: useInstanceDetailQueryType) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEY.ADMIN_INSTANCE_DETAIL],
    queryFn: () =>
      getAdminDetailInstanceApi({
        instanceId: instanceId,
      }),
  });
  return { data };
};

interface useMutateType {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
}
export const usePostInstanceCreate = ({
  onSuccess,
  onError,
}: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      setIsLoading,
      instanceTitle,
      instanceNotice,
      instanceDesc,
      instanceCertMethod,
      instanceTags,
      instanceImg,
      instancePoint,
      topicId,
      instanceRangeStart,
      instanceRangeEnd,
    }: instanceCreateApiType) =>
      postAdminInstanceApi({
        setIsLoading: setIsLoading,
        topicId: topicId,
        instanceTitle: instanceTitle,
        instanceDesc: instanceDesc,
        instanceNotice: instanceNotice,
        instanceCertMethod: instanceCertMethod,
        instanceTags: instanceTags,
        instanceImg: instanceImg,
        instancePoint: instancePoint,
        instanceRangeStart: instanceRangeStart,
        instanceRangeEnd: instanceRangeEnd,
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
export const usePatchInstanceCreate = ({
  onSuccess,
  onError,
}: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      topicIdId,
      instanceId,
      instanceTitle,
      instanceDesc,
      instanceNotice,
      instancePoint,
      instanceCertificationMethod,
      instanceStartAt,
      instanceCompletedAt,
      instanceImg,
      setIsLoading,
    }: editInstacneQueryType) =>
      patchAdminInstanceEditApi({
        setIsLoading: setIsLoading,
        topicIdId: topicIdId,
        instanceId: instanceId,
        instanceTitle: instanceTitle,
        instanceDesc: instanceDesc,
        instanceNotice: instanceNotice,
        instancePoint: instancePoint,
        instanceStartAt: instanceStartAt,
        instanceCompletedAt: instanceCompletedAt,
        instanceCertificationMethod: instanceCertificationMethod,
        instanceImg: instanceImg,
      }),
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (err: AxiosError) => {
        onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
