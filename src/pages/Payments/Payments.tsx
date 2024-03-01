import { useEffect, useRef, useState } from "react";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import PaymentsGoods from "@/components/Payments/PaymentsGoods";
import PaymentsPayInfo from "@/components/Payments/PaymentsPayInfo";
import BottomButton from "@/components/Common/BottomButton/BottomButton";

import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

import postPaymentData from "@/apis/postPaymentData";

const Payments = () => {
  const [selectedPoint, setSelectedPoint] = useState<string>("");
  const [amount, setAmount] = useState(0);

  const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
  const customerKey = nanoid();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  
  console.log(
    "`${window.location.origin}/payments/success`",
    `${window.location.origin}/payments/success`
  );

  const paymentApi = () => {
    postPaymentData({
      paymentWidgetRef: paymentWidgetRef,
      amount: amount,
      orderName: selectedPoint,
      pointAmount: selectedPoint,
      userEmail: "songmok",
    });
  };

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      // 결제 UI 렌더링
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        amount
      );
      // 이용 약관 렌더링
      paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

      paymentWidgetRef.current = paymentWidget;

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      amount,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    );
  }, [amount]);
  return (
    <>
      <MobCard>
        <Header content="충전하기" />
        <div className="flex justify-center py-[6rem] w-full">
          <div className="w-full max-w-[54.6rem] mb-[6.1rem] mx-[2.2rem]">
            <PaymentsGoods
              setSelectedPoint={setSelectedPoint}
              selectedPoint={selectedPoint}
              setAmount={setAmount}
              amount={amount}
            />
            <PaymentsPayInfo amount={amount} />
            <div id="payment-widget" />
            <div id="agreement" />
          </div>
          <BottomButton onClick={paymentApi} content="결제하기" />
        </div>
      </MobCard>
    </>
  );
};

export default Payments;
