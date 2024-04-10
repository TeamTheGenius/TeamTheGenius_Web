import { instance } from "./axios/axios";
import requests from "./axios/request";

type postPaymentFailType = {
  orderId: string | null;
  message: string | null;
};

const postPaymentFail = async ({ orderId, message }: postPaymentFailType) => {
  const body = {
    orderId: orderId,
    message: message,
  };
  await instance
    .post(`${requests.fetchPaymentTossFail}`, body)
    .then(() => {})
    .catch((err) => {
      throw err;
    });
};

export default postPaymentFail;
