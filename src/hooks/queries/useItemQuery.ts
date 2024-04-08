import postItemEquipApi from "@/apis/postItemEquipApi";
import { FRAMEID } from "@/constants/localStorageKey";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { encrypt } from "../useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import postUseItem from "@/apis/postUseItem";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";
import postdItemBuyApi from "@/apis/postdItemBuyApi";
import { AxiosError } from "axios";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import getItemPointApi from "@/apis/getItemPointApi";

export const usePostFrameItemEquiptment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => postItemEquipApi({ itemId }),
    {
      onSuccess: (data) => {
        localStorage.setItem(FRAMEID, encrypt(data.itemId));
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
      },
    }
  );
  return { mutate };
};

export const usePostFrameItemUnEquiptment = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync } = useMutation(postItemUnEquipApi, {
    onSuccess: () => {
      localStorage.removeItem(FRAMEID);
      queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
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
      useErrorBoundary: false,
    }
  );
  return { mutate };
};

export const useGetFrameItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopFrameListType[]>({
    queryKey: [QUERY_KEY.SHOP_FRAME_ITEMS],
    queryFn: () => getItemFrameApi(),
    suspense: true,
  });
  return { data, isLoading, isSuccess };
};

export const useGetPassItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopTicketListType[]>({
    queryKey: [QUERY_KEY.SHOP_PASS_ITEM],
    queryFn: () => getItemPassApi(),
    suspense: true,
  });
  return { data, isLoading, isSuccess };
};

export const useGetPointTwiceItems = () => {
  const { data, isLoading, isSuccess } = useQuery<shopTicketListType[]>({
    queryKey: [QUERY_KEY.SHOP_POINT_TWICE_ITEM],
    queryFn: () => getItemPointApi(),
    suspense: true,
  });
  return { data, isLoading, isSuccess };
};
