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
