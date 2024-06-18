import { Profile } from "@/components/Common/Profile/Profile";

interface Props {
  imgSrc: string;
  nickName: string;
  alt: string;
  frameId: number;
}
function OthersProfile({ imgSrc, alt, nickName, frameId }: Props) {
  const frame: { [key: string]: "성탄절" | "어둠의힘" | "불태워라" } = {
    1: "성탄절",
    2: "어둠의힘",
    5: "불태워라",
  };
  return (
    <Profile>
      <div className="flex gap-[1rem] items-center">
        {frameId && (
          <Profile.ImageFrame
            frame={frame[frameId]}
            frameStyle={`참가자주간인증현황_${frame[frameId]}`}
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
