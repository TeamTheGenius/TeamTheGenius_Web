import requests from "./axios/request";
import { instance } from "./axios/axios";

interface Params {
  instanceId: number;
  itemId: number;
}

const postUseItem = async ({ instanceId, itemId }: Params) => {
  const data = await instance
    .post(`${requests.fetchItemUse}/${itemId}`, " ", {
      params: {
        instanceId,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

export default postUseItem;
