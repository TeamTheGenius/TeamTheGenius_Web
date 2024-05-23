import deleteServiceWithdraw from "@/apis/deleteServiceWithdraw";
import getInterestTags from "@/apis/getInterestTags";
import getMyPageChallengesStatus from "@/apis/getMyPageChallengesStatus";
import getMyPageProfile from "@/apis/getMyPageProfile";
import postInterestEditApi from "@/apis/postInterestEditApi";
import postUserInfoEdit from "@/apis/postUserInfoEdit";
import postUserProfile from "@/apis/postUserProfile";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { QUERY_KEY } from "@/constants/queryKey";
import { useModalStore } from "@/stores/modalStore";
import {
  MyAllChallengesStatisticsDataType,
  MyProfileDataType,
  UserDataType,
} from "@/types/profileType";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetMyProfile = () => {
  const { data, isLoading } = useQuery<MyProfileDataType>({
    queryKey: [QUERY_KEY.MY_PROFILE],
    queryFn: () => getMyPageProfile(),
  });

  return { data, isLoading };
};

export const useGetUserProfile = (decryptedUserId: number) => {
  const { data } = useQuery<UserDataType>({
    queryKey: [QUERY_KEY.CERTIFICATION_USER_PROFILE, { decryptedUserId }],
    queryFn: () => postUserProfile({ userId: decryptedUserId }),
  });

  return { data };
};

export const useDeleteUser = () => {
  const { setModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (reason: string) => deleteServiceWithdraw({ reason: reason }),
    {
      onSuccess: () => {
        localStorage.removeItem(IDENTIFIER);
        localStorage.removeItem(FRAMEID);
        navigate(PATH.LOGIN);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate };
};

export const useGetMyProfileInterestTag = () => {
  const { data } = useQuery<string[]>({
    queryKey: [QUERY_KEY.MY_INTEREST_TAGS],
    queryFn: () => getInterestTags(),
  });

  return { data };
};

interface usePostMyProfileInterestTagParams {
  onSuccess: () => void;
}

export const usePostMyProfileInterestTag = ({
  onSuccess,
}: usePostMyProfileInterestTagParams) => {
  const { setModal, closeModal } = useModalStore();
  const { mutate, isLoading } = useMutation(
    (checkedValues: CheckboxValueType[]) =>
      postInterestEditApi({ interestEditData: checkedValues }),
    {
      onSuccess: () => onSuccess(),
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );

  return { mutate, isLoading };
};

interface usePostMyProfileMutationParams {
  myInfo: string;
  nickName: string;
}

export const usePostMyProfile = () => {
  const { mutate, isLoading, mutateAsync } = useMutation(
    ({ myInfo, nickName }: usePostMyProfileMutationParams) =>
      postUserInfoEdit({ myInfo, nickName }),
    {
      onSuccess: () => {},
      onError: (error) => {
        throw error;
      },
    }
  );
  return { mutate, isLoading, mutateAsync };
};

export const useGetMyAllChallengesStatistics = () => {
  const { data } = useQuery<MyAllChallengesStatisticsDataType>({
    queryKey: [QUERY_KEY.MY_ALL_CHALLENGES_STATUS],
    queryFn: () => getMyPageChallengesStatus(),
  });
  return { data };
};
