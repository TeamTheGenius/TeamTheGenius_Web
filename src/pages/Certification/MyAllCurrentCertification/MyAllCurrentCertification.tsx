import MyProfile from "@/components/Certification/MyAllCurrentCertification/MyProfile/MyProfile";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import getTotalCertification from "@/apis/getTotalCertification";
import TotalCertification from "@/components/Certification/TotalCertification/TotalCertification";
import postUserProfile from "@/apis/postUserProfile";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { decrypt } from "@/hooks/useCrypto";

interface Data {
  totalAttempts: number;
  certifications: CertificationData[];
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED" | "PASSED";
  prCount: number;
  prLinks: string[];
}

interface UserData {
  identifier: string;
  nickname: string;
  fileResponse: {
    encodedFile: "none" | string;
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

function MyAllCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const { userId } = useParams();
  const decryptedUserId = decrypt(userId);

  const { data: certifications } = useQuery<Data>({
    queryKey: [
      "totalCertification",
      { decryptedInstanceId },
      { decryptedUserId },
    ],
    queryFn: () =>
      decryptedInstanceId && decryptedUserId
        ? getTotalCertification({
            instanceId: parseInt(decryptedInstanceId),
            userId: parseInt(decryptedUserId),
          })
        : Promise.resolve(null),
  });

  const { data: userProfile } = useQuery<UserData>({
    queryKey: ["userProfile", { decryptedUserId }],
    queryFn: () =>
      decryptedUserId
        ? postUserProfile({ userId: parseInt(decryptedUserId) })
        : Promise.resolve(null),
  });

  if (!certifications) return null;
  if (!userProfile) return null;

  return (
    <MobCard>
      <Header content="나의 인증 현황" />
      <div className="py-[6rem] px-[2.2rem]">
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          <MyProfile
            imgSrc={makeBase64IncodedImage({
              uri: userProfile.fileResponse.encodedFile,
              format: "jpg",
            })}
            alt="프로필 이미지"
            nickName={userProfile.nickname}
            githubId={userProfile.identifier}
          />
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
