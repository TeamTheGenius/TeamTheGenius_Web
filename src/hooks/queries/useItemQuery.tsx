import postItemEquipApi from "@/apis/postItemEquipApi";
import { FRAMEID } from "@/constants/localStorageKey";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { encrypt } from "../useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import postUseItem from "@/apis/postUseItem";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";
import postdItemBuyApi from "@/apis/postdItemBuyApi";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import getItemPointApi from "@/apis/getItemPointApi";
import { MyChallengeDoneDataType } from "@/types/myChallengeType";
import { AxiosError } from "axios";
import { useModalStore } from "@/stores/modalStore";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import CommonModal from "@/components/Common/CommonModal/CommonModal";

interface PostFrameItemEquiptmentType {
  onSuccess: () => void;
}
export const usePostFrameItemEquiptment = ({
  onSuccess,
}: PostFrameItemEquiptmentType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => postItemEquipApi({ itemId }),
    {
      onSuccess: (data) => {
        localStorage.setItem(FRAMEID, encrypt(data.itemId));
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
        onSuccess();
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

export const usePostFrameItemUnEquiptment = () => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, mutateAsync } = useMutation(postItemUnEquipApi, {
    onSuccess: () => {
      localStorage.removeItem(FRAMEID);
      queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setModal(
        <CommonMutationErrorModal error={error} closeModal={closeModal} />
      );
    },
  });
  return { mutate, mutateAsync };
};

interface usePostItemUseMutateType {
  instanceId: number;
  itemId: number;
}

interface usePostItemUseType {
  onSuccess: () => void;
}

export const usePostCertificationPassItemUse = ({
  onSuccess,
}: usePostItemUseType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId, itemId }: usePostItemUseMutateType) =>
      postUseItem({ instanceId, itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
        onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate, isLoading };
};

interface PostPointTwiceItemUseType {
  onSuccess: (res: MyChallengeDoneDataType) => void;
}
export const usePostPointTwiceItemUse = ({
  onSuccess,
}: PostPointTwiceItemUseType) => {
  const { setModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId, itemId }: usePostItemUseMutateType) =>
      postUseItem({ instanceId, itemId }),
    {
      onSuccess: (res: MyChallengeDoneDataType) => {
        queryClient.invalidateQueries(QUERY_KEY.MY_DONE_CHALLENGES);
        onSuccess(res);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setModal(
          <CommonMutationErrorModal error={error} closeModal={closeModal} />
        );
      },
    }
  );
  return { mutate, isLoading };
};

interface usePostItemBuyType {
  onSuccess: () => void;
}
export const usePostItemBuy = ({
  onSuccess: onSuccess,
}: usePostItemBuyType) => {
  const { setModal, closeModal } = useModalStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (itemId: number) => postdItemBuyApi({ itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.SHOP_PASS_ITEM);
        queryClient.invalidateQueries(QUERY_KEY.SHOP_POINT_TWICE_ITEM);
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
        queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
        onSuccess();
      },

      onError: (error: AxiosError<{ message?: string }>) => {
        const onClickMoveToCharge = () => {
          closeModal();
          navigate(PATH.PAYMENTS);
        };

        if (
          error?.response?.data.message ===
          "프로필 프레임은 재구매가 불가능 합니다."
        )
          setModal(
            <CommonModal
              content={"이미 소지하고 있는 아이템입니다!"}
              buttonContent="확인"
              onClick={closeModal}
            />
          );
        else if (
          error?.response?.data.message ===
          "사용자의 보유 포인트가 충분하지 않습니다."
        ) {
          setModal(
            <CommonModal
              content={"포인트 잔액이 부족해요\n충전하시겠어요?"}
              buttonContent="충전하러 가기"
              onClick={onClickMoveToCharge}
            />
          );
        } else {
          setModal(
            <CommonMutationErrorModal error={error} closeModal={closeModal} />
          );
        }
      },
    }
  );
  return { mutate, isLoading };
};

export const useGetFrameItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopFrameListType[]>({
    queryKey: [QUERY_KEY.SHOP_FRAME_ITEMS],
    queryFn: () => getItemFrameApi(),
  });
  return { data, isLoading, isSuccess };
};

export const useGetPassItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopTicketListType[]>({
    queryKey: [QUERY_KEY.SHOP_PASS_ITEM],
    queryFn: () => getItemPassApi(),
  });
  return { data, isLoading, isSuccess };
};

export const useGetPointTwiceItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopTicketListType[]>({
    queryKey: [QUERY_KEY.SHOP_POINT_TWICE_ITEM],
    queryFn: () => getItemPointApi(),
  });
  return { data, isLoading, isSuccess };
};
