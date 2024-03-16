import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi({ itemId }: { itemId?: number }) {
  await instance
    .post(`${requests.fetchItemUnUse}/${itemId}`)
    .then((res) => {
      console.log("아이템 장착 성공", res);

      //   openModal();
    })
    .catch((err) => {
      console.log("아이템 해제 에러", err);
    });
}
export default postItemUnEquipApi;
