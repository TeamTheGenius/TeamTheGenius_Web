import getMyChallengeDone from "@/apis/getMyChallengeDone";
import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  MyChallengeDoneDataType,
  MyChallengePreActivityDataType,
} from "@/types/myChallengeType";
import { useQuery } from "react-query";

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

export const useGetMyActivityChallenges = () => {};
