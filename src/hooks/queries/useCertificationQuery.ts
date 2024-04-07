import postTodayCertification from "@/apis/postTodayCertification";
import { CertificationDataType } from "@/types/certificationType";
import { useMutation } from "react-query";

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
