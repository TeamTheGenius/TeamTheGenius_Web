import { Profile } from "@/components/Common/Profile/Profile";

interface Props {
  imgSrc: string;
  alt: string;
  nickName: string;
  githubId: string;
}
function MyProfile({ imgSrc, alt, nickName, githubId }: Props) {
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          <Profile.ImageFrame frame="성탄절" frameStyle="인증전체현황_성탄절" />
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
