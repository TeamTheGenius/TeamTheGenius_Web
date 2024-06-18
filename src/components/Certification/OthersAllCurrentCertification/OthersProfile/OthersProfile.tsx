import { Profile } from "@/components/Common/Profile/Profile";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useGetUserProfile } from "@/hooks/queries/useProfileQuery";

interface Props {
  decryptedUserId: number;
}
function OthersProfile({ decryptedUserId }: Props) {
  const { data: userProfile } = useGetUserProfile(decryptedUserId);

  const frame: { [key: string]: "성탄절" | "어둠의힘" | "불태워라" } = {
    1: "성탄절",
    2: "어둠의힘",
    5: "불태워라",
  };

  if (!userProfile) return null;
  return (
    <Profile>
      <Profile.FlexCol>
        <div className="mb-[1rem]">
          {userProfile.frameId && (
            <Profile.ImageFrame
              frame={frame[userProfile.frameId]}
              frameStyle={`인증전체현황_${frame[userProfile.frameId]}`}
            />
          )}
          <Profile.Image
            imgSrc={makeBase64IncodedImage({
              uri: userProfile.fileResponse.encodedFile,
              format: "jpg",
            })}
            alt={"프로필 이미지"}
            width="w-[13rem]"
          />
        </div>
        <div className="mb-[0.4rem]">
          <Profile.NickName
            content={userProfile.nickname}
            textColor="text-black"
            textSize="text-[1.8rem]"
          />
        </div>
        <Profile.GithubId
          content={userProfile.identifier}
          textColor="text-[#777]"
          textSize="text-[1.4rem]"
        />
      </Profile.FlexCol>
    </Profile>
  );
}

export default OthersProfile;
