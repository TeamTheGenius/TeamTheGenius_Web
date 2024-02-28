import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  await axios
    .post("http://localhost:8080/api/payment/toss/success", body, {
      headers: {
        Authorization: encryptedSecretKey,
      },
      withCredentials: true,
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
      console.log("err", err);
    });
};

export default postPaymentSuccess;
