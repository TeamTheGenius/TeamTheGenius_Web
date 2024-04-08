import OthersAllCertificationLinkButton from "@/components/Certification/OthersCurrentCertification/OthersAllCertificationLinkButton/OthersAllCertificationLinkButton";
import OthersProfile from "@/components/Certification/OthersCurrentCertification/OthersProfile/OthersProfile";
import ThisWeekCertification from "@/components/Certification/ThisWeekCertification/ThisWeekCertification";
import Line from "@/components/Common/Line/Line";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";
import { decrypt } from "@/hooks/useCrypto";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { AllWeekCertificationDataType } from "@/types/certificationType";
import { useGetAllCertificationWeek } from "@/hooks/queries/useCertificationQuery";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

function OthersCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const [ref, inView] = useInView();

  const [certifications, setcertifications] = useState<
    AllWeekCertificationDataType[]
  >([]);

  const { fetchNextPage, hasNextPage, isLoading } = useGetAllCertificationWeek({
    decryptedInstanceId,
    setcertifications,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingBox />;

  return (
    <div className="mt-[3.8rem] _sm:mt-[2.4rem] flex flex-col gap-[3rem] justify-center items-center px-[2.2rem] pb-[2.2rem]">
      {certifications.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-[2.4rem] w-full max-w-[48.5rem] _sm:max-w-[36rem] "
        >
          <div>
            <div className="flex justify-between mb-[2.3rem] _sm:mb-[1.7rem]">
              {item.profile.encodedFile === "none" ? (
                <OthersProfile
                  imgSrc={basicProfileImage}
                  alt="프로필 이미지"
                  nickName={item.nickname}
                  frameId={item.frameId}
                />
              ) : (
                <OthersProfile
                  imgSrc={makeBase64IncodedImage({
                    uri: item.profile.encodedFile,
                    format: "jpg",
                  })}
                  alt="프로필 이미지"
                  nickName={item.nickname}
                  frameId={item.frameId}
                />
              )}

              <OthersAllCertificationLinkButton
                userId={item.userId}
                instanceId={parseInt(decryptedInstanceId)}
              />
            </div>
            <ThisWeekCertification data={certifications[index]} />
          </div>
          {index != othersAllCertificationData.length - 1 && <Line />}
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
        </div>
      ))}
    </div>
  );
}

export default OthersCurrentCertification;
