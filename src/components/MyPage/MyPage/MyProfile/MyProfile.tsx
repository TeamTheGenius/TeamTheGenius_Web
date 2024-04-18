import { Profile } from "@/components/Common/Profile/Profile";
import SettingButton from "../SettingButton/SettingButton";
import Temperature from "../Temperature/Temperature";
import MyPoint from "../MyPoint/MyPoint";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { FRAMEID } from "@/constants/localStorageKey";
import { decrypt } from "@/hooks/useCrypto";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { useGetMyProfile } from "@/hooks/queries/useProfileQuery";

function MyProfile() {
  const { data } = useGetMyProfile();

  if (!data) {
    return;
  }

  const frameGet = localStorage.getItem(FRAMEID);
  const frameId = decrypt(frameGet);
  const frame: { [key: string]: "성탄절" | "어둠의힘" } = {
    1: "성탄절",
    2: "어둠의힘",
  };

  return (
    <>
      <div className="mt-[1.8rem] flex justify-between gap-[1.7rem] w-full min-h-[12.5rem] _sm:min-h-[10.2rem]">
        <div className="max-w-[10.2rem] w-full">
          <Profile>
            {frameId && (
              <Profile.ImageFrame
                frame={frame[frameId]}
                frameStyle={`마이페이지_${frame[frameId]}`}
              />
            )}
            {data.fileResponse.encodedFile === "none" ? (
              <Profile.Image
                imgSrc={basicProfileImage}
                alt="프로필 이미지"
                width="w-[10.2rem]"
              />
            ) : (
              <Profile.Image
                imgSrc={makeBase64IncodedImage({
                  uri: data.fileResponse.encodedFile,
                  format: "png",
                })}
                alt="프로필 이미지"
                width="w-[10.2rem]"
              />
            )}
          </Profile>
        </div>
        <div className="w-full max-w-[34.4rem]">
          <div className="flex flex-col gap-[1.7rem] w-full h-full min-h-[10.2rem]">
            <div className="flex w-full justify-between gap-[1rem]">
              <Profile>
                <Profile.GithubId
                  content={data.identifier}
                  textColor="text-black"
                  textSize="text-[1.8rem]"
                  smTextSize="_sm:text-[1.6rem]"
                />
                <div className="mt-[0.4rem]">
                  <Profile.NickName
                    content={data.nickname}
                    textColor="text-[#777]"
                    textSize="text-[1.6rem]"
                    smTextSize="text-[1.4rem]"
                  />
                </div>
              </Profile>

              <div className="flex justify-center items-center">
                <SettingButton />
              </div>
            </div>
            <div className="w-full flex justify-end h-full items-end">
              <Temperature temperature={data.progressBar} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[1.5rem] _sm:mt-[1.8rem] ml-[1.5rem]">
        <Profile>
          <Profile.Introduce content={data.information} />
        </Profile>
      </div>
      <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem] mx-auto">
        <MyPoint />
      </div>
    </>
  );
}

export default MyProfile;
