import axios from "axios";

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

  await axios
    .post("http://localhost:8080/api/payment/toss", body, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("res", res.data.data);
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
      console.log("err", err);
    });
};

export default postPaymentData;
