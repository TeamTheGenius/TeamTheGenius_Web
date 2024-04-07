import { instance } from "./axios/axios";
import requests from "./axios/request";

type postdItemBuyApiType = {
  itemId: number;
};
const postdItemBuyApi = async ({ itemId }: postdItemBuyApiType) => {
  await instance
    .post(`${requests.fetchItemOrder}/${itemId}`)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postdItemBuyApi;
