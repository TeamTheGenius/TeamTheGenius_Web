import postItemEquipApi from "@/apis/postItemEquipApi";
import { FRAMEID } from "@/constants/localStorageKey";
import { useMutation, useQueryClient } from "react-query";
import { encrypt } from "../useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import postUseItem from "@/apis/postUseItem";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";
import postdItemBuyApi from "@/apis/postdItemBuyApi";
import { AxiosError } from "axios";

interface usePostFrameItemType {
  onSuccess: () => void;
}
export const usePostFrameItemEquiptment = ({
  onSuccess,
}: usePostFrameItemType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => postItemEquipApi({ itemId }),
    {
      onSuccess: (data) => {
        localStorage.setItem(FRAMEID, encrypt(data.itemId));
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
        onSuccess();
      },
    }
  );
  return { mutate };
};

interface PostFrameItemUnEquiptmentType {
  onSuccess: () => void;
}
export const usePostFrameItemUnEquiptment = ({
  onSuccess,
}: PostFrameItemUnEquiptmentType) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync } = useMutation(postItemUnEquipApi, {
    onSuccess: () => {
      localStorage.removeItem(FRAMEID);
      queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
      onSuccess();
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
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ instanceId, itemId }: usePostItemUseMutateType) =>
      postUseItem({ instanceId, itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_ACTIVITY_CHALLENGES);
        onSuccess();
      },
    }
  );
  return { mutate };
};

export const usePostPointTwiceItemUse = ({ onSuccess }: usePostItemUseType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ instanceId, itemId }: usePostItemUseMutateType) =>
      postUseItem({ instanceId, itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.MY_DONE_CHALLENGES);
        onSuccess();
      },
    }
  );
  return { mutate };
};

interface usePostItemBuyType {
  onSuccess: () => void;
  onError: (errMessage: string) => void;
}
export const usePostItemBuy = ({
  onSuccess: onSuccess,
  onError: onError,
}: usePostItemBuyType) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (itemId: number) => postdItemBuyApi({ itemId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.SHOP_PASS_ITEM);
        queryClient.invalidateQueries(QUERY_KEY.SHOP_POINT_TWICE_ITEM);
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
        queryClient.invalidateQueries(QUERY_KEY.MY_PROFILE);
        onSuccess();
      },
      onError: (err: AxiosError) => {
        onError(err?.response?.data?.message);
      },
    }
  );
  return { mutate };
};
