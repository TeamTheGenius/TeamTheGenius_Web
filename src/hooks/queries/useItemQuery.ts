import postItemEquipApi from "@/apis/postItemEquipApi";
import { FRAMEID } from "@/constants/localStorageKey";
import { useMutation, useQueryClient } from "react-query";
import { encrypt } from "../useCrypto";
import { QUERY_KEY } from "@/constants/queryKey";

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
