import { Profile } from "@/components/Common/Profile/Profile";
import SettingButton from "../SettingButton/SettingButton";
import Temperature from "../Temperature/Temperature";

function MyProfile() {
  return (
    <>
      <div className="flex justify-between gap-[1rem] w-full min-h-[12.5rem] _sm:min-h-[10.2rem]">
        <div className="max-w-[10.2rem] w-full">
          <Profile>
            <Profile.Image />
          </Profile>
        </div>
        <div className="w-full max-w-[34.4rem]">
          <div className="flex flex-col gap-[1.7rem] w-full h-full min-h-[10.2rem]">
            <div className="flex w-full justify-between gap-[1rem]">
              <Profile>
                <Profile.GithubId />
                <Profile.NickName />
              </Profile>
              <div className="flex justify-center items-center">
                <SettingButton />
              </div>
            </div>
            <div className="w-full flex justify-end h-full items-end">
              <Temperature />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[1.5rem] _sm:mt-[1.8rem] ml-[1.5rem]">
        <Profile>
          <Profile.Introduce />
        </Profile>
      </div>
    </>
  );
}

export default MyProfile;
