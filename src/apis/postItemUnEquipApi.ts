import { FRAMEID } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi({
  queryClient,
  setLoadingState,
}: {
  queryClient?: any;
  setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  await instance
    .post(`${requests.fetchItemUnUse}`)
    .then(() => {
      if (setLoadingState) {
        setLoadingState(false);
      }
      localStorage.removeItem(FRAMEID);
      queryClient?.invalidateQueries(["itemFrameList"]);
    })
    .catch((err) => {
      throw err;
    });
}
export default postItemUnEquipApi;
