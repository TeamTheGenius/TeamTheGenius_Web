import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemEquipApi({ itemId }: { itemId?: number }) {
  const data = await instance
    .post(`${requests.fetchItemUse}/${itemId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
}
export default postItemEquipApi;
