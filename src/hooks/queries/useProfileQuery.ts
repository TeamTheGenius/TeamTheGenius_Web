import getMyPageProfile from "@/apis/getMyPageProfile";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "react-query";

export interface ProfileData {
  identifier: string;
  nickname: string;
  information: string;
  point: number;
  progressBar: number;
  fileResponse: {
    encodedFile: string;
  };
}

export const useGetMyProfile = () => {
  const { data } = useQuery<ProfileData>({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: () => getMyPageProfile(),
    suspense: true,
  });
  return { data };
};
