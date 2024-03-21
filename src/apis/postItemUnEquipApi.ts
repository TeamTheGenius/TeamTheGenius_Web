import { FRAMEID } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi({ queryClient }: { queryClient?: any }) {
  await instance
    .post(`${requests.fetchItemUnUse}`)
    .then(() => {
      localStorage.removeItem(FRAMEID);
      queryClient?.invalidateQueries(["itemFrameList"]);
    })
    .catch((err) => {
      throw err;
    });
}
export default postItemUnEquipApi;
