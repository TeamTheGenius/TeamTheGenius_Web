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

interface PostFrameItemEquiptmentType {
  onError: (error: AxiosError<{ message?: string }>) => void;
  onSuccess?: () => void;
}
export const usePostFrameItemEquiptment = ({
  onError,
  onSuccess,
}: PostFrameItemEquiptmentType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => postItemEquipApi({ itemId }),
    {
      onSuccess: (data) => {
        localStorage.setItem(FRAMEID, encrypt(data.itemId));
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
        onSuccess && onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => onError(error),
    }
  );
  return { mutate };
};

interface PostFrameItemUnEquiptmentType {
  onError: (error: AxiosError<{ message?: string }>) => void;
}

export const usePostFrameItemUnEquiptment = ({
  onError,
}: PostFrameItemUnEquiptmentType) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync } = useMutation(postItemUnEquipApi, {
    onSuccess: () => {
      localStorage.removeItem(FRAMEID);
      queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      onError(error);
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
  onError: (error: AxiosError<{ message?: string }>) => void;
}

export const usePostCertificationPassItemUse = ({
  onSuccess,
  onError,
}: usePostItemUseType) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ instanceId, itemId }: usePostItemUseMutateType) =>
      postUseItem({ instanceId, itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
        onSuccess();
      },
      onError: (error: AxiosError<{ message?: string }>) => onError(error),
    }
  );
  return { mutate, isLoading };
};

interface PostPointTwiceItemUseType {
  onSuccess: (res: MyChallengeDoneDataType) => void;
  onError: (error: AxiosError<{ message?: string }>) => void;
}
export const usePostPointTwiceItemUse = ({
  onSuccess,
  onError,
}: PostPointTwiceItemUseType) => {
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
        onError(error);
      },
    }
  );
  return { mutate, isLoading };
};

interface usePostItemBuyType {
  onSuccess: () => void;
  onError: (error: AxiosError<{ message?: string }>) => void;
}
export const usePostItemBuy = ({
  onSuccess: onSuccess,
  onError: onError,
}: usePostItemBuyType) => {
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
        onError(error);
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
