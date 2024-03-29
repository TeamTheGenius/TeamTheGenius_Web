import { instance } from "./axios/axios";
import requests from "./axios/request";

const getPaymentReceiptApi = async () => {
  const data = await instance
    .get(`${requests.fetchPaymentReceipt}`)
    .then((res: any) => {
      return res.data.data.content || {};
    });
  return data || {};
};

export default getPaymentReceiptApi;
