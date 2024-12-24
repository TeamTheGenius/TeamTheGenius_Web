import { Profile } from "@/components/Common/Profile/Profile";
import { FRAMEID } from "@/constants/localStorageKey";
import { decrypt } from "@/hooks/useCrypto";
import { profileImageFrame } from "@/data/frameData";

interface UserInfoProps {
  image: string;
}

function ProfileImage({ image }: UserInfoProps) {
  const frameGet = localStorage.getItem(FRAMEID);
  const frameId = decrypt(frameGet);

  return (
    <Profile>
      {frameId && (
        <Profile.ImageFrame
          frame={profileImageFrame[frameId]}
          frameStyle={`마이페이지`}
        />
      )}
      <Profile.Image imgSrc={image} alt="프로필 이미지" width="w-[10.2rem]" />
    </Profile>
  );
}
export default ProfileImage;
