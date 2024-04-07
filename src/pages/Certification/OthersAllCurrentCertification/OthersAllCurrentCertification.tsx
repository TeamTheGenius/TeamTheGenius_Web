import OthersProfile from "@/components/Certification/OthersAllCurrentCertification/OthersProfile/OthersProfile";
import TotalCertification from "@/components/Certification/TotalCertification/TotalCertification";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { decrypt } from "@/hooks/useCrypto";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useParams } from "react-router-dom";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { useGetUserProfile } from "@/hooks/queries/useProfileQuery";
import { useGetTotalCertifications } from "@/hooks/queries/useCertificationQuery";

function OthersAllCurrentCertification() {
  const { id } = useParams();
  const { userId } = useParams();
  const decryptedInstanceId = decrypt(id);
  const decryptedUserId = decrypt(userId);

  const { data: certifications } = useGetTotalCertifications({
    decryptedInstanceId,
    decryptedUserId,
  });

  const { data: userProfile } = useGetUserProfile(decryptedUserId);

  if (!certifications) return null;
  if (!userProfile) return null;

  return (
    <MobCard>
      <Header content="참가자 인증 현황" />
      <div className="py-[6rem] px-[2.2rem] relative">
        {/* <div className="absolute top-[6rem] right-[2.2rem]">
          <ReportButton />
        </div> */}
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          {userProfile.fileResponse.encodedFile === "none" ? (
            <OthersProfile
              imgSrc={basicProfileImage}
              alt="프로필 이미지"
              nickName={userProfile.nickname}
              githubId={userProfile.identifier}
              frameId={userProfile.frameId}
            />
          ) : (
            <OthersProfile
              imgSrc={makeBase64IncodedImage({
                uri: userProfile.fileResponse.encodedFile,
                format: "jpg",
              })}
              alt="프로필 이미지"
              nickName={userProfile.nickname}
              githubId={userProfile.identifier}
              frameId={userProfile.frameId}
            />
          )}
          <div className="mt-[9.2rem] _sm:mt-[4.8rem]">
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-[54rem] grid grid-cols-7 _sm:grid-cols-5 _md:grid-cols-6 gap-x-[2rem] gap-y-[5rem] ">
                <TotalCertification data={certifications} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobCard>
  );
}

export default OthersAllCurrentCertification;
