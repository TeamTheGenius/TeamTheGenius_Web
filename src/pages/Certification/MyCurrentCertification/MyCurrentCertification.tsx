import CurrentAchivementRate from "@/components/Certification/MyCurrentCertification/CurrentAchivementRate/CurrentAchivementRate";
import MyAllCertificationLinkButton from "@/components/Certification/MyCurrentCertification/MyAllCertificationLinkButton/MyAllCertificationLinkButton";

function MyCurrentCertification() {
  return (
    <div className="px-[2.2rem]">
      <div className="mt-[2.4rem] _sm:mt-[2rem]">
        <MyAllCertificationLinkButton />
      </div>
      <div className=" mt-[1.4rem] ">
        <CurrentAchivementRate />
      </div>
    </div>
  );
}

export default MyCurrentCertification;
