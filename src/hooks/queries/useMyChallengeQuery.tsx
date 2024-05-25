import getMyChallengeActivity from "@/apis/getMyChallengeActivity";
import getMyChallengeDone from "@/apis/getMyChallengeDone";
import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import {
  MyChallengeActivityDataType,
  MyChallengeDoneDataType,
  MyChallengePreActivityDataType,
} from "@/types/myChallengeType";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetMyPreActivityChallenges = () => {
  const { data } = useQuery<MyChallengePreActivityDataType[]>({
    queryKey: [QUERY_KEY.MY_PRE_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengePreActivity(),
  });
  return { data };
};

export const useGetMyDoneChallenges = () => {
  const { data } = useQuery<MyChallengeDoneDataType[]>({
    queryKey: [QUERY_KEY.MY_DONE_CHALLENGES],
    queryFn: () => getMyChallengeDone(),
  });
  return { data };
};

export const useGetMyActivityChallenges = () => {
  const { data } = useQuery<MyChallengeActivityDataType[]>({
    queryKey: [QUERY_KEY.MY_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengeActivity(),
  });
  return { data };
};

interface GetChallengeSuccessRewardMutateType {
  instanceId: number;
}
interface GetChallengeSuccessRewardType {
  onSuccess: (res: MyChallengeDoneDataType) => void;
}

export const useGetChallengeSuccessReward = ({
  onSuccess,
}: GetChallengeSuccessRewardType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId }: GetChallengeSuccessRewardMutateType) =>
      getMyChallengeDoneReward({ instanceId }),
    {
      onSuccess: (res: MyChallengeDoneDataType) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_DONE_CHALLENGES);
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
