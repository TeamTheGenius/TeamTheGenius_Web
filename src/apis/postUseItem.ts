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
    .then((res) => {
      console.log("아이템 사용 성공", res);
    })
    .catch((err) => {
      console.log("아이템 사용 실패", err);
      throw err;
    });
};

export default postUseItem;
