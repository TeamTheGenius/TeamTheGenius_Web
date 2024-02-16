import { Profile } from "@/components/Common/Profile/Profile";

function MyProfile() {
  return (
    <Profile>
      <Profile.FlexCol>
        <Profile.Image width="w-[13rem]" />
        <Profile.NickName textColor="text-black" textSize="text-[1.8rem]" />
        <Profile.GithubId textColor="text-[#777]" textSize="text-[1.4rem]" />
      </Profile.FlexCol>
    </Profile>
  );
}

export default MyProfile;
