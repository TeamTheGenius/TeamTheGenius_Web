import MyChallengeWrap from "@/components/Main/MyChallenge/MyChallengeWrap/MyChallengeWrap";
import MyChallengePic from "@/components/Main/MyChallenge/MyChallengePic/MyChallengePic";
import MyChallengeTitle from "@/components/Main/MyChallenge/MyChallengeTitle/MyChallengeTitle";
import MyChallengeLinkWrap from "@/components/Main/MyChallenge/MyChallengeLinkWrap/MyChallengeLinkWrap";
import MyChallengeLabel from "@/components/Main/MyChallenge/MyChallengeLabel/MyChallengeLabel";
const MyChallengeStart = () => {
  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지",
      title: "1 일 1 커밋 챌린지",
      point: "100p",
      date: "D - 4",
      people: "24명",
      labelText: "시작 전",
      labelState: false,
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디 그룹",
      point: "200p",
      date: "D - 4",
      people: "24명",
      labelText: "시작 전",
      labelState: false,
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      point: "300p",
      date: "D - 4",
      people: "24명",
      labelText: "시작 전",
      labelState: false,
    },
  ];
  return (
    <>
      <MyChallengeWrap>
        {data.map((item) => (
          <MyChallengeLinkWrap key={item.id} link={item.link}>
            <MyChallengePic
              overlayState={true}
              propsText={item.date}
              img={item.imgSrc}
              alt={item.alt}
              people={item.people}
            />
            <MyChallengeTitle title={item.title} point={item.point} />
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

export default MyChallengeStart;
