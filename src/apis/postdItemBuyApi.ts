import { instance } from "./axios/axios";
import requests from "./axios/request";

type postdItemBuyApiType = {
  itemId?: number;
  queryClient: any;
};
const postdItemBuyApi = async ({
  itemId,
  queryClient,
}: postdItemBuyApiType) => {
  const body = {
    itemId: itemId,
  };

  await instance
    .post(`${requests.fetchItemOrder}/${itemId}`)
    .then((res) => {
      console.log("구매성공", res);
      queryClient.invalidateQueries(["itemAllList"]);
    })
    .catch((err) => {
      console.log("구매실패", err.response.data.message);
      alert(err.response.data.message);
    });
};

export default postdItemBuyApi;
