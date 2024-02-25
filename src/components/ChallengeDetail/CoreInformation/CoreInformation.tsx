import blackPersonIcon from "@/assets/icon/black-person-icon.svg";
interface Props {
  challengeTitle: string;
  applicant: number;
  period: string;
  dDay?: number;
  point: number;
}
function CoreInformation({
  challengeTitle,
  applicant,
  period,
  dDay,
  point,
}: Props) {
  return (
    <div className="flex flex-col gap-[0.9rem] px-[2.2rem]">
      <p className="text-[2.3rem] font-semibold leading-_normal">
        {challengeTitle}
      </p>
      <div className="flex gap-[0.7rem]">
        <img src={blackPersonIcon} alt="신청 인원 수 아이콘" />
        <p className="text-[1.6rem] font-medium leading-_normal">
          현재 {applicant}명
        </p>
      </div>
      <p className="text-[1.6rem] font-normal">{period} / 매일</p>
      <p className="text-[1.2rem] font-normal text-[#FF2626]">
        {dDay}일 후 시작
      </p>
      <p className="text-[1.6rem] ">
        <span className="font-normal leading-_normal">완료 보상</span>{" "}
        <span className="font-medium leading-_normal">{point}P</span>
      </p>
    </div>
  );
}

export default CoreInformation;
