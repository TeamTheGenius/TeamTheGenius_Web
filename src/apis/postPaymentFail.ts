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
    .then((res) => {
      console.log("failRes", res);
    })
    .catch((err) => {
      console.log("failErr", err);
    });
};

export default postPaymentFail;
