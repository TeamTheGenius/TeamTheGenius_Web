import { instance } from "./axios/axios";
import requests from "./axios/request";

async function postItemUnEquipApi() {
  await instance
    .post(`${requests.fetchItemUnUse}`)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
}
export default postItemUnEquipApi;
