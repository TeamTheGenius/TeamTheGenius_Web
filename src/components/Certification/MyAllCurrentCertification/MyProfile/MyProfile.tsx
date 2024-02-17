import { Profile } from "@/components/Common/Profile/Profile";

function MyProfile() {
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          <Profile.Image width="w-[13rem]" />
        </div>
        <div className="mb-[0.4rem]">
          <Profile.NickName textColor="text-black" textSize="text-[1.8rem]" />
        </div>
        <Profile.GithubId textColor="text-[#777]" textSize="text-[1.4rem]" />
      </Profile.FlexCol>
    </Profile>
  );
}

export default MyProfile;
