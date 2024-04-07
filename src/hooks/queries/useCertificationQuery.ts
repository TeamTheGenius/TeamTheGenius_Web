import getCertificationInstanceDetail from "@/apis/getCertificationInstanceDetail ";
import postTodayCertification from "@/apis/postTodayCertification";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  CertificationDataType,
  CertificationInstnaceDetailDataType,
} from "@/types/certificationType";
import { useMutation, useQuery } from "react-query";

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
