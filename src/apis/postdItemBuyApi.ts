import { QueryClient } from "react-query";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type postdItemBuyApiType = {
  itemId?: number;
  queryClient: QueryClient;
};
const postdItemBuyApi = async ({
  itemId,
  queryClient,
}: postdItemBuyApiType) => {
  const body = {
    itemId: itemId,
  };

  await instance
    .post(`${requests.fetchItemOrder}`, body)
    .then((res) => {
      console.log("구매성공", res);
      queryClient.invalidateQueries(["itemAllList"]);
    })
    .catch((err) => {
      console.log("구매실패", err);
    });
};

export default postdItemBuyApi;
