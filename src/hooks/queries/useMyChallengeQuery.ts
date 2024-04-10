import getMyChallengeActivity from "@/apis/getMyChallengeActivity";
import getMyChallengeDone from "@/apis/getMyChallengeDone";
import getMyChallengeDoneReward from "@/apis/getMyChallengeDoneReward";
import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  MyChallengeActivityDataType,
  MyChallengeDoneDataType,
  MyChallengePreActivityDataType,
} from "@/types/myChallengeType";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetMyPreActivityChallenges = () => {
  const { data } = useQuery<MyChallengePreActivityDataType[]>({
    queryKey: [QUERY_KEY.MY_PRE_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengePreActivity(),
    suspense: true,
  });
  return { data };
};

export const useGetMyDoneChallenges = () => {
  const { data } = useQuery<MyChallengeDoneDataType[]>({
    queryKey: [QUERY_KEY.MY_DONE_CHALLENGES],
    queryFn: () => getMyChallengeDone(),
    suspense: true,
  });
  return { data };
};

export const useGetMyActivityChallenges = () => {
  const { data } = useQuery<MyChallengeActivityDataType[]>({
    queryKey: [QUERY_KEY.MY_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengeActivity(),
    suspense: true,
  });
  return { data };
};

interface GetChallengeSuccessRewardMutateType {
  instanceId: number;
}
interface GetChallengeSuccessRewardType {
  onSuccess: (res: MyChallengeDoneDataType) => void;
  onError: () => void;
}

export const useGetChallengeSuccessReward = ({
  onSuccess,
  onError,
}: GetChallengeSuccessRewardType) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId }: GetChallengeSuccessRewardMutateType) =>
      getMyChallengeDoneReward({ instanceId }),
    {
      onSuccess: (res: MyChallengeDoneDataType) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_DONE_CHALLENGES);
        onSuccess(res);
      },
      onError: () => {
        onError();
      },
    }
  );
  return { mutate, isLoading };
};
