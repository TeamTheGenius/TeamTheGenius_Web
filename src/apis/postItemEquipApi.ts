import { FRAMEID } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";
import { encrypt } from "@/hooks/useCrypto";

async function postItemEquipApi({
  itemId,
  queryClient,
}: {
  itemId?: number;
  queryClient: any;
}) {
  await instance
    .post(`${requests.fetchItemUse}/${itemId}`)
    .then((res) => {
      localStorage.setItem(FRAMEID, encrypt(res.data.data.itemId));
      queryClient.invalidateQueries(["itemFrameList"]);
    })
    .catch((err) => {
      throw err;
    });
}
export default postItemEquipApi;
