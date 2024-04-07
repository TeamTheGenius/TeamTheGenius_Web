import MyProfile from "@/components/Certification/MyAllCurrentCertification/MyProfile/MyProfile";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { useParams } from "react-router-dom";
import TotalCertification from "@/components/Certification/TotalCertification/TotalCertification";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { decrypt } from "@/hooks/useCrypto";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { useGetUserProfile } from "@/hooks/queries/useProfileQuery";
import { useGetTotalCertifications } from "@/hooks/queries/useCertificationQuery";

function MyAllCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const { userId } = useParams();
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
      <Header content="나의 인증 현황" />
      <div className="py-[6rem] px-[2.2rem]">
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          {userProfile.fileResponse.encodedFile === "none" ? (
            <MyProfile
              imgSrc={basicProfileImage}
              alt="프로필 이미지"
              nickName={userProfile.nickname}
              githubId={userProfile.identifier}
            />
          ) : (
            <MyProfile
              imgSrc={makeBase64IncodedImage({
                uri: userProfile.fileResponse.encodedFile,
                format: "jpg",
              })}
              alt="프로필 이미지"
              nickName={userProfile.nickname}
              githubId={userProfile.identifier}
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

export default MyAllCurrentCertification;
