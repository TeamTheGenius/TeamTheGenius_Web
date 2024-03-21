import { FRAMEID } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";

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
      localStorage.setItem(FRAMEID, res.data.data.itemId);
      queryClient.invalidateQueries(["itemFrameList"]);
    })
    .catch((err) => {
      throw err;
    });
}
export default postItemEquipApi;
