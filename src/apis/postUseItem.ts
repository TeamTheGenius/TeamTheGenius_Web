import requests from "./axios/request";
import { instance } from "./axios/axios";

interface Params {
  instanceId: number;
  itemId: number;
}

const postUseItem = async ({ instanceId, itemId }: Params) => {
  return instance
    .post(`${requests.fetchItemUse}/${itemId}`, " ", {
      params: {
        instanceId,
      },
    })
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postUseItem;
