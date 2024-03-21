import { instance } from "./axios/axios";
import requests from "./axios/request";

type postPaymentDataType = {
  amount: number;
  orderName: string;
  pointAmount: string;
  userEmail: string;
  paymentWidgetRef: any;
};

const postPaymentData = async ({
  amount,
  orderName,
  pointAmount,
  userEmail,
  paymentWidgetRef,
}: postPaymentDataType) => {
  const body = {
    amount: amount,
    orderName: orderName,
    pointAmount: Number(pointAmount),
    userEmail: userEmail,
  };

  await instance
    .post(`${requests.fetchPaymentToss}`, body)
    .then((res) => {
      const payData = res.data.data;
      const paymentWidget = paymentWidgetRef.current;
      paymentWidget?.requestPayment({
        orderId: payData.orderId,
        orderName: payData.orderName,
        successUrl: `${window.location.origin}/payments/success`,
        failUrl: `${window.location.origin}/payments/fail`,
      });
    })
    .catch((err) => {
      throw err;
    });
};

export default postPaymentData;
