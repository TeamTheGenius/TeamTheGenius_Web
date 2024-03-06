import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import ReasonChoice from "@/components/MyPage/ServiceWithdraw/ReasonChoice/ReasonChoice";
import Title from "@/components/MyPage/ServiceWithdraw/Title/Title";
import WithdrawButton from "@/components/MyPage/ServiceWithdraw/WithdrawButton/WithdrawButton";
import { ChangeEvent, useState } from "react";

type Reason =
  | "앱 사용이 불편해요"
  | "참여할 만한 챌린지가 없어요"
  | "쓰지 않는 서비스예요"
  | "기타";

function ServiceWithdraw() {
  const [selectedReason, setSelectedReason] =
    useState<Reason>("앱 사용이 불편해요");
  const [otherReason, setOtherReason] = useState<string>("");
  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Reason;
    setSelectedReason(value);

    if (value !== "기타") {
      setOtherReason("");
    }
  };

  const reasons: Reason[] = [
    "앱 사용이 불편해요",
    "참여할 만한 챌린지가 없어요",
    "쓰지 않는 서비스예요",
    "기타",
  ];

  const onChangeOtherReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOtherReason(e.target.value);
  };

  return (
    <MobCard>
      <Header content="탈퇴하기" />
      <div className="pt-[6rem] pb-[10rem] px-[2.2rem]">
        <div className="max-w-[53.7rem] mt-[2.5rem] mx-auto">
          <Title />
        </div>
        <div className="mt-[1.4rem] max-w-[54rem] mx-auto">
          <ReasonChoice
            reasons={reasons}
            selectedReason={selectedReason}
            onChangeRadio={onChangeRadio}
            otherReason={otherReason}
            onChangeOtherReason={onChangeOtherReason}
          />
        </div>
      </div>
      <div className="h-[8.5rem] px-[2.2rem] fixed bottom-0 flex justify-center items-center _sm:justify-end w-full max-w-[77.3rem] mx-auto bg-white">
        <WithdrawButton
          selectedReason={selectedReason}
          otherReason={otherReason}
        />
      </div>
    </MobCard>
  );
}

export default ServiceWithdraw;
