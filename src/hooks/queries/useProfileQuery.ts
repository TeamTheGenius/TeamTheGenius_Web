import getMyPageProfile from "@/apis/getMyPageProfile";
import postUserProfile from "@/apis/postUserProfile";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "react-query";

export interface MyProfileData {
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
  const { data } = useQuery<MyProfileData>({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: () => getMyPageProfile(),
    suspense: true,
  });

  return { data };
};

export interface UserData {
  identifier: string;
  nickname: string;
  fileResponse: {
    encodedFile: "none" | string;
  };
  frameId: number;
}

export const useGetUserProfile = (decryptedUserId: string) => {
  const { data } = useQuery<UserData>({
    queryKey: [QUERY_KEY.CERTIFICATION_USER_PROFILE, { decryptedUserId }],
    queryFn: () =>
      decryptedUserId
        ? postUserProfile({ userId: parseInt(decryptedUserId) })
        : Promise.resolve(null),
  });

  return { data };
};
