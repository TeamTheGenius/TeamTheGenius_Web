import { useNavigate } from "react-router-dom";
import { instance } from "./axios/axios";

type postPaymentSuccessType = {
  orderId?: string | null;
  amount?: string | null;
  paymentKey?: string | null;
  encryptedSecretKey?: string;
};
const postPaymentSuccess = async ({
  orderId,
  amount,
  paymentKey,
  encryptedSecretKey,
}: postPaymentSuccessType) => {
  const navigate = useNavigate();
  const body = {
    orderId: orderId,
    amount: amount,
    paymentKey: paymentKey,
  };

  await instance
    .post("http://localhost:8080/api/payment/toss/success", body, {
      headers: {
        Authorization: encryptedSecretKey,
      },
    })
    .then((res) => {
      const resData = res.data.data;
      if (resData.code) {
        navigate(
          `/payment/fail?code=${resData.code}&message=${resData.message}&orderId=${resData.orderId}`
        );
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default postPaymentSuccess;
