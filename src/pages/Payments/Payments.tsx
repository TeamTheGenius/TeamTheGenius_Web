import { useEffect, useRef, useState } from "react";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import PaymentsGoods from "@/components/Payments/PaymentsGoods";
import PaymentsPayInfo from "@/components/Payments/PaymentsPayInfo";
import BottomButton from "@/components/common/BottomButton/BottomButton";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
const Payments = () => {
  const [selectedPoint, setSelectedPoint] = useState<string>("");
  const [amount, setAmount] = useState(0);

  const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
  const customerKey = nanoid();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

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
          <div className="w-full max-w-[54.6rem] mb-[6.1rem]">
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
          <BottomButton>
            <button
              className="w-[46.7rem] h-[6.1rem] bg-[#FF4356] text-[1.8rem] text-white font-medium rounded-[1rem]"
              onClick={async () => {
                const paymentWidget = paymentWidgetRef.current;
                try {
                  await paymentWidget?.requestPayment({
                    orderId: nanoid(),
                    orderName: selectedPoint,
                    customerName: "김토스",
                    customerEmail: "customer123@gmail.com",
                    successUrl: `${window.location.origin}/payments/success`,
                    failUrl: `${window.location.origin}/payments/fail`,
                  });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              결제하기
            </button>
          </BottomButton>
        </div>
      </MobCard>
    </>
  );
};

export default Payments;
