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
};
type useInstanceDetailQueryType = {
  instanceId?: number;
};

export const useInstanceListQuery = ({
  pageNumber,
}: useInstanceListQueryType) => {
  const { data } = useQuery<any>({
    queryKey: [QUERY_KEY.ADMIN_INSTANCE_PAGE, pageNumber],
    queryFn: () =>
      getAdminInstanceListPageApi({
        pageNumber: pageNumber,
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

type PostInstanceCreateType = {
  onSuccess: (res: any) => void;
};

export const usePostInstanceCreate = ({
  onSuccess,
}: PostInstanceCreateType) => {
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
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};

export const usePostInstanceFileCreate = () => {
  const { mutate, isLoading } = useMutation(
    ({ instanceImg, instanceId }: instanceCreateFileApiType) =>
      postAdminInstanceFileApi({
        instanceId: instanceId,
        instanceImg: instanceImg,
      }),
    {
      onSuccess: () => {},
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};

type PatchInstanceCreateType = {
  onSuccess: (res: any) => void;
};
export const usePatchInstanceCreate = ({
  onSuccess,
}: PatchInstanceCreateType) => {
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
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};
export const usePatchInstanceFileCreate = () => {
  const { mutate, isLoading } = useMutation(
    ({ instanceId, instanceImg }: editInstacneFileApiType) =>
      patchAdminInstanceFileEditApi({
        instanceId: instanceId,
        instanceImg: instanceImg,
      }),
    {
      onError: (err: AxiosError<{ message?: string }>) => {
        const errorMessage = err?.response?.data?.message;
        alert(errorMessage || "예상치 못한 에러가 발생했습니다.");
      },
    }
  );
  return { mutate, isLoading };
};
