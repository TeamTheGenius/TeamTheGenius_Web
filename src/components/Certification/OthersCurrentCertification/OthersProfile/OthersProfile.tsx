import { Profile } from "@/components/Common/Profile/Profile";
import { profileImageFrame } from "@/data/frameData";

interface Props {
  imgSrc: string;
  nickName: string;
  alt: string;
  frameId: number;
}
function OthersProfile({ imgSrc, alt, nickName, frameId }: Props) {
  return (
    <Profile>
      <div className="flex gap-[1rem] items-center">
        {frameId && (
          <Profile.ImageFrame
            frame={profileImageFrame[frameId]}
            frameStyle={`참가자주간인증현황`}
          />
        )}
        <Profile.Image imgSrc={imgSrc} alt={alt} width="w-[4.8rem]" />
        <Profile.NickName
          content={nickName}
          textSize="text-[1.4rem]"
          textColor="text-black"
        />
      </div>
    </Profile>
  );
}

export default OthersProfile;
