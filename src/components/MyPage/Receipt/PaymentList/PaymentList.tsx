import getPaymentReceiptApi from "@/apis/getPaymentReceiptApi";
import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
import { QUERY_KEY } from "@/constants/queryKey";
import useNumberFormat from "@/hooks/useNumberFormat";
import { useQuery } from "react-query";

type receiptType = {
  orderType: string;
  orderName: string;
  orderLocalDate: string;
  chargingCash: null | number;
  decreasedPoint: string;
  increasedPoint: null | string;
  orderDayOfWeek: string;
};
type MonthlyOrders = {
  [key: string]: receiptType[];
};

function PaymentList() {
  const { data } = useQuery<receiptType[]>({
    queryKey: [QUERY_KEY.MY_PAYMENT_RECEIPT],
    queryFn: () => getPaymentReceiptApi(),
  });

  const monthlyOrders: MonthlyOrders =
    data?.reduce<MonthlyOrders>((acc, order) => {
      const month = order.orderLocalDate.slice(0, 7);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(order);
      return acc;
    }, {}) || {};

  const formatMonth = (month: string): string => {
    const [year, monthPart] = month.split("-");
    return `${year}년 ${monthPart}월`;
  };
  const formatDateAndDayOfWeek = (
    orderLocalDate: string,
    orderDayOfWeek: string
  ) => {
    const day = orderLocalDate.split("-")[2];
    const shortDayOfWeek = orderDayOfWeek[0];

    return `${day}.${shortDayOfWeek}`;
  };

  return (
    <>
      {!data?.length && (
        <div className="mt-[6rem]">
          <EmptyDataView>
            <EmptyDataView.WindFallenLeavesIcon />
            <EmptyDataView.Title title="결제 내역이 없습니다" />
            <EmptyDataView.SubTitle subTitle="마음에 드는 상품을 구매해보세요!" />
          </EmptyDataView>
        </div>
      )}
      {Object.entries(monthlyOrders).map(([month, orders]) => {
        const formattedMonth = formatMonth(month);
        return (
          <div key={month} className="w-full">
            <span className="text-[1.5rem] font-medium mb-[2rem] block">
              {formattedMonth}
            </span>
            <ul className="flex flex-col items-center w-full">
              {orders.map((order, index) => {
                const formattedDate = formatDateAndDayOfWeek(
                  order.orderLocalDate,
                  order.orderDayOfWeek
                );
                const formattedPoint = useNumberFormat(order.decreasedPoint);
                return (
                  <li
                    key={index}
                    className="flex w-full max-w-[52.6rem] text-[1.5rem]"
                  >
                    <span className="basis-auto">{formattedDate}</span>
                    <div className="flex flex-col mb-[2.3rem] ml-[7.1rem] _sm:ml-[2.3rem]">
                      <span className="font-medium">{order.orderType}</span>
                      <span className="font-medium text-[1.3rem] text-[#777777]">
                        [상품명_{order.orderName}]
                      </span>
                    </div>
                    <span className="text-[#3F75FF] font-bold ml-auto">
                      - {formattedPoint}P
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default PaymentList;
