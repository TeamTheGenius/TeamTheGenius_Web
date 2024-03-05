import { Profile } from "@/components/Common/Profile/Profile";
import SettingButton from "../SettingButton/SettingButton";
import Temperature from "../Temperature/Temperature";
import MyPoint from "../MyPoint/MyPoint";
import { useQuery } from "@tanstack/react-query";
import getMyPageProfile from "@/apis/getMyPageProfile";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";

interface Data {
  identifier: "string";
  nickname: "string";
  information: "string";
  point: number;
  progressBar: number;
  fileResponse: {
    encodedFile: "string";
  };
}

function MyProfile() {
  const { data } = useQuery<Data>({
    queryKey: ["myPageProfile"],
    queryFn: () => getMyPageProfile(),
  });

  if (!data) {
    return;
  }
  return (
    <>
      <div className="flex justify-between gap-[1rem] w-full min-h-[12.5rem] _sm:min-h-[10.2rem]">
        <div className="max-w-[10.2rem] w-full">
          <Profile>
            <Profile.Image
              imgSrc={makeBase64IncodedImage({
                uri: data.fileResponse.encodedFile,
                format: "jpg",
              })}
              alt="프로필 이미지"
              width="w-[10.2rem]"
            />
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
        <MyPoint point={data.point || 0} />
      </div>
    </>
  );
}

export default MyProfile;
