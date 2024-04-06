import deleteServiceWithdraw from "@/apis/deleteServiceWithdraw";
import getMyPageProfile from "@/apis/getMyPageProfile";
import postUserProfile from "@/apis/postUserProfile";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { QUERY_KEY } from "@/constants/queryKey";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (reason: string) => deleteServiceWithdraw({ reason: reason }),
    {
      onSuccess: () => {
        localStorage.removeItem(IDENTIFIER);
        localStorage.removeItem(FRAMEID);
        navigate(PATH.LOGIN);
      },
    }
  );
  return { mutate };
};
