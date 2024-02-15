import CurrentAchivementRate from "@/components/Certification/MyCurrentCertification/CurrentAchivementRate/CurrentAchivementRate";
import MyAllCertificationLinkButton from "@/components/Certification/MyCurrentCertification/MyAllCertificationLinkButton/MyAllCertificationLinkButton";
import MyCertificationSummary from "@/components/Certification/MyCurrentCertification/MyCertificationSummary/MyCertificationSummary";
import ThisWeekCertification from "@/components/Certification/MyCurrentCertification/ThisWeekCertification/ThisWeekCertification";

function MyCurrentCertification() {
  return (
    <div className="px-[2.2rem] pb-[2.2rem]">
      <div className="mt-[2.4rem] _sm:mt-[2rem]">
        <MyAllCertificationLinkButton />
      </div>
      <div className=" mt-[1.4rem] ">
        <CurrentAchivementRate />
      </div>
      <div className="mt-[2.3rem] _sm:mt-[3.7rem]">
        <MyCertificationSummary />
      </div>
      <div className="mt-[4.6rem] _sm:mt-[3.7rem]">
        <ThisWeekCertification />
      </div>
    </div>
  );
}

export default MyCurrentCertification;
