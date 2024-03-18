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
      console.log("아이템 장착 성공", res);
      queryClient.invalidateQueries(["itemAllList"]);
    })
    .catch((err) => {
      console.log("아이템 장착 실패", err);
    });
}
export default postItemEquipApi;
