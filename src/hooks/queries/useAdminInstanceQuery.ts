import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";
import getAdminInstanceListPageApi from "@/apis/getAdminInstanceListApi";
import patchAdminInstanceEditApi from "@/apis/patchAdminInstanceEditApi";
import patchAdminInstanceFileEditApi from "@/apis/patchAdminInstanceFileEditApi";
import postAdminInstanceApi from "@/apis/postAdminInstanceApi";
import postAdminInstanceFileApi from "@/apis/postAdminInstanceFileApi";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  editInstacneApiType,
  editInstacneFileApiType,
  instanceCreateApiType,
  instanceCreateFileApiType,
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
type useMutateType = {
  onSuccess: (res: any) => void;
  onError: (errorMessage: string) => void;
};
type useMutatePatchType = {
  onError: (errorMessage: string) => void;
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
      }),
    onSuccess: (data) => {
      if (setTotalNumber) {
        setTotalNumber(data.totalElements);
      }
    },
    keepPreviousData: true,
    suspense: true,
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

export const usePostInstanceCreate = ({
  onSuccess,
  onError,
}: useMutateType) => {
  const { mutate, isLoading } = useMutation(
    ({
      instanceTitle,
      instanceNotice,
      instanceDesc,
      instanceCertMethod,
      instanceTags,
      instancePoint,
      topicId,
      instanceRangeStart,
      instanceRangeEnd,
    }: instanceCreateApiType) =>
      postAdminInstanceApi({
        topicId: topicId,
        instanceTitle: instanceTitle,
        instanceDesc: instanceDesc,
        instanceNotice: instanceNotice,
        instanceCertMethod: instanceCertMethod,
        instanceTags: instanceTags,
        instancePoint: instancePoint,
        instanceRangeStart: instanceRangeStart,
        instanceRangeEnd: instanceRangeEnd,
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
type useMutatePostInstanceFileCreateType = {
  onError: (errorMessage: string) => void;
};
export const usePostInstanceFileCreate = ({
  onError,
}: useMutatePostInstanceFileCreateType) => {
  const { mutate, isLoading } = useMutation(
    ({ instanceImg, instanceId }: instanceCreateFileApiType) =>
      postAdminInstanceFileApi({
        instanceId: instanceId,
        instanceImg: instanceImg,
      }),
    {
      onSuccess: () => {},
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
    }: editInstacneApiType) =>
      patchAdminInstanceEditApi({
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
export const usePatchInstanceFileCreate = ({ onError }: useMutatePatchType) => {
  const { mutate, isLoading } = useMutation(
    ({ instanceId, instanceImg }: editInstacneFileApiType) =>
      patchAdminInstanceFileEditApi({
        instanceId: instanceId,
        instanceImg: instanceImg,
      }),
    {
      onError: (err: AxiosError<{ message?: string }>) => {
        err.response?.data.message && onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate, isLoading };
};
