import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi({
  itemId,
  queryClient,
}: {
  itemId?: number;
  queryClient: any;
}) {
  await instance
    .post(`${requests.fetchItemUnUse}/${itemId}`)
    .then((res) => {
      console.log("아이템 해제 성공", res);
      queryClient.invalidateQueries(["itemAllList"]);
    })
    .catch((err) => {
      console.log("아이템 해제 에러", err);
    });
}
export default postItemUnEquipApi;
