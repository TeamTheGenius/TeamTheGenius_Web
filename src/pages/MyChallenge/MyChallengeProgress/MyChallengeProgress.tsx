import ChallengeItem from "@/components/Common/ChallengeItem/ChallengeItem";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import successStamp from "@/assets/icon/success-stamp.svg";
import { PATH } from "@/constants/path";
import getMyChallengeActivity from "@/apis/getMyChallengeActivity";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useQuery } from "react-query";

interface Data {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  repository: string;
  certificateStatus: "패스 완료" | "인증 갱신" | "인증 필요";
  numOfPassItem: number;
  canUsePassItem: boolean;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

const MyChallengeProgress = () => {
  const { data } = useQuery<Data[]>({
    queryKey: ["myChallengeActivity"],
    queryFn: () => getMyChallengeActivity(),
  });

  if (!data) {
    return;
  }

  return (
    <>
      <MyChallengeWrap>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="flex justify-between w-full relative mb-[1.3rem]"
            >
              <MyChallengeLinkWrap
                key={index}
                link={`${PATH.CERTIFICATION}/${item.instanceId}/my-current`}
              >
                <div className="w-[16.4rem] h-[12.6rem] mr-[1.8rem] _sm:mr-[1.1rem]">
                  <ChallengeItem>
                    <ChallengeItem.Image
                      imgSrc={makeBase64IncodedImage({
                        uri: item.fileResponse.encodedFile,
                        format: "jpg",
                      })}
                      alt={"챌린지 이미지"}
                      direction="vertical"
                    >
                      {item.certificateStatus === "패스 완료" && (
                        <ChallengeItem.Overlay text="패 스" />
                      )}
                      {item.certificateStatus === "인증 갱신" && (
                        <ChallengeItem.Overlay />
                      )}

                      {item.certificateStatus === "인증 갱신" && (
                        <img
                          src={successStamp}
                          alt="성공 스탬프"
                          className="bottom-[1rem] right-[1rem] absolute "
                        />
                      )}
                    </ChallengeItem.Image>
                  </ChallengeItem>
                </div>
                <MyChallengeTitle
                  title={item.title}
                  point={item.pointPerPerson}
                  repositoryName={item.repository}
                />
              </MyChallengeLinkWrap>
              <MyChallengeLabel labelText={item.certificateStatus} />
            </li>
          );
        })}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeProgress;
