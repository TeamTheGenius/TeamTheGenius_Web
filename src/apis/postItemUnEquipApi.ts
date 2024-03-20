import { FRAMEID } from "@/constants/localStorageKey";
import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi({ queryClient }: { queryClient: any }) {
  await instance
    .post(`${requests.fetchItemUnUse}`)
    .then((res) => {
      console.log("아이템 해제 성공", res);
      localStorage.removeItem(FRAMEID);
      queryClient.invalidateQueries(["itemAllList"]);
    })
    .catch((err) => {
      console.log("아이템 해제 에러", err);
    });
}
export default postItemUnEquipApi;
