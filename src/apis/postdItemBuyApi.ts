import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import { instance } from "./axios/axios";
import requests from "./axios/request";

type postdItemBuyApiType = {
  item?: shopFrameListType | shopTicketListType;
  queryClient: any;
  completeModal: any;
};
const postdItemBuyApi = async ({
  item,
  queryClient,
  completeModal,
}: postdItemBuyApiType) => {
  const itemId = item?.itemId;
  await instance
    .post(`${requests.fetchItemOrder}/${itemId}`)
    .then((res) => {
      completeModal();
      queryClient.invalidateQueries(["itemPassList"]);
      queryClient.invalidateQueries(["itemPointList"]);
      queryClient.invalidateQueries(["itemFrameList"]);
      queryClient.invalidateQueries(["myPageProfile"]);
    })
    .catch((err) => {
      throw err;
    });
};

export default postdItemBuyApi;
