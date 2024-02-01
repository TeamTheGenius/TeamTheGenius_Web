import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengePic from "@/components/Main/MyChallenge/MyChallengePic/MyChallengePic";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";

const MyChallengeProgress = () => {
  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지",
      title: "1 일 1 커밋 챌린지",
      point: "100p",
      time: "00 : 00 ~ 00 : 00",
      people: "24명",
      labelText: "인증 필요",
      labelState: false,
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디 그룹",
      point: "200p",
      time: "00 : 00 ~ 00 : 00",
      people: "24명",
      labelText: "인증 완료",
      labelState: true,
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      point: "300p",
      time: "00 : 00 ~ 00 : 00",
      people: "24명",
      labelText: "인증 필요",
      labelState: false,
    },
  ];
  return (
    <>
      <MyChallengeWrap>
        {data.map((item) => (
          <MyChallengeLinkWrap key={item.id} link={item.link}>
            <MyChallengePic
              overlayState={false}
              img={item.imgSrc}
              alt={item.alt}
            />
            <MyChallengeTitle
              title={item.title}
              point={item.point}
              authTime={item.time}
            />
            <MyChallengeLabel
              labelState={item.labelState}
              labelText={item.labelText}
            />
          </MyChallengeLinkWrap>
        ))}
      </MyChallengeWrap>
    </>
  );
};

export default MyChallengeProgress;
