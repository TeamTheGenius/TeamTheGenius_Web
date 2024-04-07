import getCertificationInstanceDetail from "@/apis/getCertificationInstanceDetail ";
import getMyWeekCertification from "@/apis/getMyWeekCertification";
import getOthersWeekCertification from "@/apis/getOthersWeekCertification";
import getTotalCertification from "@/apis/getTotalCertification";
import postTodayCertification from "@/apis/postTodayCertification";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  AllWeekCertificationDataType,
  CertificationDataType,
  CertificationInstnaceDetailDataType,
  TotalCertificationDataType,
  myWeekCertificationDataType,
} from "@/types/certificationType";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

interface PostTodayCertificationMutateType {
  instanceId: number;
  targetDate: string;
}

interface PostTodayCertificationType {
  onSuccess: (res: CertificationDataType) => void;
}
export const usePostTodayCertification = ({
  onSuccess,
}: PostTodayCertificationType) => {
  const { mutate } = useMutation(
    ({ instanceId, targetDate }: PostTodayCertificationMutateType) =>
      postTodayCertification({ instanceId, targetDate }),
    {
      onSuccess: (res) => {
        onSuccess(res);
      },
    }
  );
  return { mutate };
};

interface GetCertificationInstanceDetailType {
  decryptedInstanceId: number;
}
export const useGetCertificationInstanceDetail = ({
  decryptedInstanceId,
}: GetCertificationInstanceDetailType) => {
  const { data, isLoading } = useQuery<CertificationInstnaceDetailDataType>({
    queryKey: [
      QUERY_KEY.CERTIFICATION_INSTANCE_DETAIL,
      { decryptedInstanceId },
    ],
    queryFn: () =>
      getCertificationInstanceDetail({
        instanceId: decryptedInstanceId,
      }),
  });
  return { data, isLoading };
};

interface GetCertificationWeekType {
  decryptedInstanceId: number;
}
export const useGetMyCertificationWeek = ({
  decryptedInstanceId,
}: GetCertificationWeekType) => {
  const { data } = useQuery<myWeekCertificationDataType>({
    queryKey: [
      QUERY_KEY.MY_WEEK_CERTIFICATIONS_OF_INSTANCE,
      { decryptedInstanceId },
    ],
    queryFn: () =>
      getMyWeekCertification({
        instanceId: decryptedInstanceId,
      }),
  });
  return { data };
};

interface GetAllCertificationWeekType {
  setcertifications: React.Dispatch<
    React.SetStateAction<AllWeekCertificationDataType[]>
  >;
  decryptedInstanceId: number;
}

export const useGetAllCertificationWeek = ({
  decryptedInstanceId,
  setcertifications,
}: GetAllCertificationWeekType) => {
  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      QUERY_KEY.INFINITE_OTHERS_WEEK_CERTIFICATIONS_OF_INSTANCE,
      { decryptedInstanceId },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getOthersWeekCertification({
        pageParams: pageParam,
        instanceId: decryptedInstanceId,
        size: 20,
      }),
    getNextPageParam: (lastPage) => {
      return !lastPage.isLast ? lastPage.page + 1 : undefined;
    },
    onSuccess: (res) => {
      const certifications = res.pages.map((page) => page.posts).flat();
      setcertifications(certifications);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage };
};

interface GetTotalCertificationsType {
  decryptedInstanceId: number;
  decryptedUserId: number;
}

export const useGetTotalCertifications = ({
  decryptedInstanceId,
  decryptedUserId,
}: GetTotalCertificationsType) => {
  const { data } = useQuery<TotalCertificationDataType>({
    queryKey: [
      QUERY_KEY.ALL_CERTIFICATIONS_OF_INSTANCE,
      { decryptedInstanceId },
      { decryptedUserId },
    ],
    queryFn: () =>
      getTotalCertification({
        instanceId: decryptedInstanceId,
        userId: decryptedUserId,
      }),
  });
  return { data };
};
