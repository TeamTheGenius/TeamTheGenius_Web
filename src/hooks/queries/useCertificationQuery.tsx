import getCertificationInformation from "@/apis/getCertificationInformation ";
import getCertificationInstanceDetail from "@/apis/getCertificationInstanceDetail ";
import getMyWeekCertification from "@/apis/getMyWeekCertification";
import getOthersWeekCertification from "@/apis/getOthersWeekCertification";
import getTotalCertification from "@/apis/getTotalCertification";
import postTodayCertification from "@/apis/postTodayCertification";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import {
  CertificationDataType,
  CertificationInstnaceDetailDataType,
  CertificationStatisticsType,
  TotalCertificationDataType,
  myWeekCertificationDataType,
} from "@/types/certificationType";
import { AxiosError } from "axios";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

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
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ instanceId, targetDate }: PostTodayCertificationMutateType) =>
      postTodayCertification({ instanceId, targetDate }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
        onSuccess(res);
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
  decryptedInstanceId: number;
}

export const useGetAllCertificationWeek = ({
  decryptedInstanceId,
}: GetAllCertificationWeekType) => {
  const { fetchNextPage, hasNextPage, isLoading, data } = useInfiniteQuery({
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
  });
  return { fetchNextPage, hasNextPage, isLoading, data };
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

interface GetCertificationStatisticsType {
  decryptedInstanceId: number;
}
export const useGetCertificationStatistics = ({
  decryptedInstanceId,
}: GetCertificationStatisticsType) => {
  const { data } = useQuery<CertificationStatisticsType>({
    queryKey: [
      QUERY_KEY.MY_CERTIFICATIONS_STATUS_OF_INSTANCE,
      { decryptedInstanceId },
    ],
    queryFn: () =>
      getCertificationInformation({
        instanceId: decryptedInstanceId,
      }),
  });
  return { data };
};
