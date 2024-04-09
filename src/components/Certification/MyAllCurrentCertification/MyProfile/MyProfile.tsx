import { Profile } from "@/components/Common/Profile/Profile";
import { FRAMEID } from "@/constants/localStorageKey";
import { useGetUserProfile } from "@/hooks/queries/useProfileQuery";
import { decrypt } from "@/hooks/useCrypto";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";

interface Props {
  decryptedUserId: number;
}
function MyProfile({ decryptedUserId }: Props) {
  const { data: userProfile } = useGetUserProfile(decryptedUserId);
  const frameId = localStorage.getItem(FRAMEID);
  const decryptedFrameId = decrypt(frameId);
  const frame: { [key: string]: "성탄절" | "어둠의힘" } = {
    1: "성탄절",
    2: "어둠의힘",
  };
  if (!userProfile) return null;
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          {decryptedFrameId && (
            <Profile.ImageFrame
              frame={frame[decryptedFrameId]}
              frameStyle={`인증전체현황_${frame[decryptedFrameId]}`}
            />
          )}
          {userProfile.fileResponse.encodedFile === "none" ? (
            <Profile.Image
              imgSrc={basicProfileImage}
              alt="프로필 이미지"
              width="w-[13rem]"
            />
          ) : (
            <Profile.Image
              imgSrc={makeBase64IncodedImage({
                uri: userProfile.fileResponse.encodedFile,
                format: "jpg",
              })}
              alt={"프로필 이미지"}
              width="w-[13rem]"
            />
          )}
        </div>
        <div className="mb-[0.4rem]">
          <Profile.NickName
            content={userProfile.nickname}
            textColor="text-black"
            textSize="text-[1.8rem]"
          />
        </div>
        <Profile.GithubId
          content={userProfile.identifier}
          textColor="text-[#777]"
          textSize="text-[1.4rem]"
        />
      </Profile.FlexCol>
    </Profile>
  );
}

export default MyProfile;
