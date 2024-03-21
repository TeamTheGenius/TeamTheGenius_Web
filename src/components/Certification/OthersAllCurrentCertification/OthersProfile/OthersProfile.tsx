import { Profile } from "@/components/Common/Profile/Profile";

interface Props {
  imgSrc: string;
  alt: string;
  nickName: string;
  githubId: string;
  frameId: number;
}
function OthersProfile({ imgSrc, alt, nickName, githubId, frameId }: Props) {
  const frame: { [key: string]: "성탄절" | "어둠의힘" } = {
    1: "성탄절",
    2: "어둠의힘",
  };
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          {frameId && (
            <Profile.ImageFrame
              frame={frame[frameId]}
              frameStyle={`인증전체현황_${frame[frameId]}`}
            />
          )}
          <Profile.Image imgSrc={imgSrc} alt={alt} width="w-[13rem]" />
        </div>
        <div className="mb-[0.4rem]">
          <Profile.NickName
            content={nickName}
            textColor="text-black"
            textSize="text-[1.8rem]"
          />
        </div>
        <Profile.GithubId
          content={githubId}
          textColor="text-[#777]"
          textSize="text-[1.4rem]"
        />
      </Profile.FlexCol>
    </Profile>
  );
}

export default OthersProfile;
