import getMyChallengePreActivity from "@/apis/getMyChallengePreActivity";
import { QUERY_KEY } from "@/constants/queryKey";
import { MyChallengeThumbnailDataType } from "@/types/myChallengeType";
import { useQuery } from "react-query";

export const useGetMyPreActivityChallenges = () => {
  const { data } = useQuery<MyChallengeThumbnailDataType[]>({
    queryKey: [QUERY_KEY.MY_PRE_ACTIVITY_CHALLENGES],
    queryFn: () => getMyChallengePreActivity(),
    suspense: true,
  });
  return { data };
};

export const useGetMyDoneChallenges = () => {};

export const useGetMyActivityChallenges = () => {};
