import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengePic from "@/components/Main/MyChallenge/MyChallengePic/MyChallengePic";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";

const MyChallengeComplete = () => {
  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지",
      title: "1일1커밋 챌린지",
      point: "100p",
      completePoint: "130p",
      completePer: "100%",
      completeState: true,
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디와 커밋 알고리즘",
      point: "200p",
      completePoint: "130p",
      completePer: "100%",
      completeState: false,
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      point: "300p",
      completePoint: "130p",
      completePer: "100%",
      completeState: false,
    },
  ];
  return (
    <>
      <MyChallengeWrap>
        {data.map((item) => (
          <MyChallengeLinkWrap key={item.id} link={item.link}>
            <MyChallengePic
              overlayState={item.completeState}
              completeState={item.completeState}
              propsText="실 패"
              img={item.imgSrc}
              alt={item.alt}
            />
            <MyChallengeTitle title={item.title} point={item.point} />
            <div className="flex justify-between w-full max-w-[16rem] absolute bottom-0 right-0">
              <div className="flex justify-start flex-col">
                <span className="text-[#777777] text-[12px] font-medium">
                  획득 포인트
                </span>
                <span className="text-black text-[18px] font-medium">
                  {item.completePoint}
                </span>
              </div>
              <div className="flex justify-start flex-col">
                <span className="text-[#777777] text-[12px] font-medium">
                  달성률
                </span>
                <span className="text-black text-[18px] font-medium">
                  {item.completePer}
                </span>
              </div>
            </div>
          </MyChallengeLinkWrap>
        ))}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeComplete;
