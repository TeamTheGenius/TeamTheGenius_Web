import deleteServiceWithdraw from "@/apis/deleteServiceWithdraw";
import getInterestTags from "@/apis/getInterestTags";
import getMyPageChallengesStatus from "@/apis/getMyPageChallengesStatus";
import getMyPageProfile from "@/apis/getMyPageProfile";
import postInterestEditApi from "@/apis/postInterestEditApi";
import postUserInfoEdit from "@/apis/postUserInfoEdit";
import postUserProfile from "@/apis/postUserProfile";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { QUERY_KEY } from "@/constants/queryKey";
import {
  MyAllChallengesStatisticsDataType,
  MyProfileDataType,
  UserDataType,
} from "@/types/profileType";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetMyProfile = () => {
  const { data, isLoading } = useQuery<MyProfileDataType>({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: () => getMyPageProfile(),
    suspense: true,
  });

  return { data, isLoading };
};

export const useGetUserProfile = (decryptedUserId: number) => {
  const { data } = useQuery<UserDataType>({
    queryKey: [QUERY_KEY.CERTIFICATION_USER_PROFILE, { decryptedUserId }],
    queryFn: () => postUserProfile({ userId: decryptedUserId }),
    suspense: true,
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

interface useGetMyProfileInterestTagParams {
  onSuccess: (check: CheckboxValueType[]) => void;
}

export const useGetMyProfileInterestTag = ({
  onSuccess,
}: useGetMyProfileInterestTagParams) => {
  const { data } = useQuery<string[]>({
    queryKey: [QUERY_KEY.MY_INTEREST_TAGS],
    queryFn: () => getInterestTags(),
    onSuccess: (data) => onSuccess(data),
  });

  return { data };
};

interface usePostMyProfileInterestTagParams {
  onSuccess: () => void;
  onError: () => void;
}

export const usePostMyProfileInterestTag = ({
  onSuccess,
  onError,
}: usePostMyProfileInterestTagParams) => {
  const { mutate } = useMutation(
    (checkedValues: CheckboxValueType[]) =>
      postInterestEditApi({ interestEditData: checkedValues }),
    {
      onSuccess: () => onSuccess(),
      onError: () => onError(),
      useErrorBoundary: false,
    }
  );

  return { mutate };
};

interface usePostMyProfileParams {
  onSuccess: () => void;
  onError: () => void;
}

interface usePostMyProfileMutationParams {
  myInfo: string;
  nickName: string;
  files: string;
}

export const usePostMyProfile = ({
  onSuccess,
  onError,
}: usePostMyProfileParams) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(
    ({ myInfo, nickName, files }: usePostMyProfileMutationParams) =>
      postUserInfoEdit({ myInfo, nickName, files }),
    {
      onSuccess: () => {
        onSuccess();
        queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
        navigate(PATH.MY_PAGE);
      },
      onError: () => onError(),
      useErrorBoundary: false,
    }
  );
  return { mutate };
};

export const useGetMyAllChallengesStatistics = () => {
  const { data } = useQuery<MyAllChallengesStatisticsDataType>({
    queryKey: [QUERY_KEY.MY_ALL_CHALLENGES_STATUS],
    queryFn: () => getMyPageChallengesStatus(),
    suspense: true,
  });
  return { data };
};
