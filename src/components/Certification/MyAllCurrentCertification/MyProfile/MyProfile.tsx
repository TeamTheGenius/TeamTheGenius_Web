import { Profile } from "@/components/Common/Profile/Profile";
import { FRAMEID } from "@/constants/localStorageKey";
import { decrypt } from "@/hooks/useCrypto";
import { useGetUserProfile } from "@/hooks/queries/useProfileQuery";
import { profileImageFrame } from "@/data/frameData";
import { makeAPIImage } from "@/helpers/makeAPIImage";

interface Props {
  decryptedUserId: number;
}
function MyProfile({ decryptedUserId }: Props) {
  const { data: userProfile } = useGetUserProfile(decryptedUserId);
  const frameId = localStorage.getItem(FRAMEID);
  const decryptedFrameId = decrypt(frameId);

  if (!userProfile) return null;
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          {decryptedFrameId && (
            <Profile.ImageFrame
              frame={profileImageFrame[decryptedFrameId]}
              frameStyle={`인증전체현황`}
            />
          )}
          <Profile.Image
            imgSrc={makeAPIImage(userProfile.fileResponse)}
            alt={"프로필 이미지"}
            width="w-[13rem]"
          />
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
