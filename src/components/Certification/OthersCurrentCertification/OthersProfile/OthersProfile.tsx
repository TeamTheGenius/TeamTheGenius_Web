import { Profile } from "@/components/Common/Profile/Profile";

interface Props {
  imgSrc: string;
  nickName: string;
  alt: string;
}
function OthersProfile({ imgSrc, alt, nickName }: Props) {
  return (
    <Profile>
      <div className="flex gap-[1rem] items-center">
        <Profile.ImageFrame
          frame="어둠의힘"
          frameStyle="참가자주간인증현황_어둠의힘"
        />
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
