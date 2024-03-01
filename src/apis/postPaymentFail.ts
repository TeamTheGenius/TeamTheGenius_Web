import axios from "axios";

type postPaymentFailType = {
  orderId: string | null;
  message: string | null;
};

const postPaymentFail = async ({ orderId, message }: postPaymentFailType) => {
  const body = {
    orderId: orderId,
    message: message,
  };
  await axios
    .post("http://localhost:8080/api/payment/toss/fail", body, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("failRes", res);
    })
    .catch((err) => {
      console.log("failErr", err);
    });
};

export default postPaymentFail;
