import postItemEquipApi from "@/apis/postItemEquipApi";
import { FRAMEID } from "@/constants/localStorageKey";
import { useMutation, useQueryClient } from "react-query";
import { encrypt } from "../useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";
import postUseItem from "@/apis/postUseItem";

interface usePostFrameItemType {
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}
export const usePostFrameItemEquiptment = ({
  setLoadingState,
}: usePostFrameItemType) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (itemId: number) => postItemEquipApi({ itemId }),
    {
      onSuccess: (data) => {
        setLoadingState(false);
        localStorage.setItem(FRAMEID, encrypt(data.itemId));
        queryClient.invalidateQueries(QUERY_KEY.SHOP_FRAME_ITEMS);
      },
    }
  );
  return { mutate };
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

export const usePostItemUnEquiptment = () => {};
