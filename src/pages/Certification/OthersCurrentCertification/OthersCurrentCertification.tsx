import OthersAllCertificationLinkButton from "@/components/Certification/OthersCurrentCertification/OthersAllCertificationLinkButton/OthersAllCertificationLinkButton";
import OthersProfile from "@/components/Certification/OthersCurrentCertification/OthersProfile/OthersProfile";
import ThisWeekCertification from "@/components/Certification/OthersCurrentCertification/ThisWeekCertification/ThisWeekCertification";
import Line from "@/components/Common/Line/Line";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";

function OthersCurrentCertification() {
  return (
    <div className="mt-[3.8rem] _sm:mt-[2.4rem] flex flex-col gap-[3rem] justify-center items-center px-[2.2rem] pb-[2.2rem]">
      {othersAllCertificationData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-[2.4rem] w-full max-w-[48.5rem] _sm:max-w-[36rem] "
        >
          <div>
            <div className="flex justify-between mb-[2.3rem] _sm:mb-[1.7rem]">
              <OthersProfile
                imgSrc={item.imgSrc}
                alt="프로필 이미지"
                nickName={item.nickName}
              />
              <OthersAllCertificationLinkButton othersId={item.id} />
            </div>
            <ThisWeekCertification data={item.certificationInfo} />
          </div>
          {index != othersAllCertificationData.length - 1 && <Line />}
        </div>
      ))}
    </div>
  );
}

export default OthersCurrentCertification;
0.8;
