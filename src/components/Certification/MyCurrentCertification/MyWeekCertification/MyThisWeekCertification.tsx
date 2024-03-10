import checkIcon from "@/assets/icon/red-check-icon.svg";
import ThisWeekCertification from "../../ThisWeekCertification/ThisWeekCertification";

interface Data {
  data: {
    userId: number;
    certifications: CertificationData[];
  };
}

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED" | "PASSED";
  prCount: number;
  prLinks: string[];
}

function MyThisWeekCertification({ data }: Data) {
  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">이번 주 인증 모아보기</p>
      </div>
      <div className=" mt-[2.3rem] pb-[5rem]">
        <ThisWeekCertification data={data} />
      </div>
    </>
  );
}

export default MyThisWeekCertification;
