import { Profile } from "@/components/Common/Profile/Profile";
import { FRAMEID } from "@/constants/localStorageKey";
import { decrypt } from "@/hooks/useCrypto";

interface Props {
  imgSrc: string;
  alt: string;
  nickName: string;
  githubId: string;
}
function MyProfile({ imgSrc, alt, nickName, githubId }: Props) {
  const frameId = localStorage.getItem(FRAMEID);
  const decryptedFrameId = decrypt(frameId);
  const frame: { [key: string]: "성탄절" | "어둠의힘" } = {
    1: "성탄절",
    2: "어둠의힘",
  };

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

export default MyProfile;
