import humanIcon from "@/assets/icon/human-icon.svg";
import arrowRight from "@/assets/icon/arrow-right.svg";
import { Link } from "react-router-dom";
const MyChallengeStart = () => {
  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지",
      title: "1 일 1 커밋 챌린지",
      point: "보상 100p",
      data: "d - 4",
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디 그룹",
      point: "보상 200p",
      data: "d - 4",
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      link: "/",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      point: "보상 300p",
      data: "d - 4",
    },
  ];
  return (
    <>
      <div className="w-full relative flex justify-center">
        <div className="myChallenge-wrap mt-[1.7rem]">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex justify-between w-full relative mb-[1.3rem]"
            >
              <Link to={item.link} className="w-full h-full">
                <div className="flex">
                  <div className="relative mr-[1.8rem] _sm:mr-[1.1rem] w-[16.4rem] h-[12.6rem]">
                    <div className="absolute w-full h-full opacity-55 bg-black rounded-[10px]"></div>
                    <div className="absolute w-full h-full flex justify-center items-center">
                      <span className="text-white text-[1.6rem] font-medium">
                        {item.data}
                      </span>
                    </div>
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      className="w-full h-full rounded-[10px]"
                    />
                    <div className="absolute flex justify-evenly items-center w-[4.8rem] h-[1.9rem] left-[1rem] top-[0.3rem] bg-black rounded-[0.8rem]">
                      <img src={humanIcon} alt="humanIcon" />
                      <span className="text-white text-[1rem]">24명</span>
                    </div>
                  </div>
                  <div className="w-[14rem]">
                    <h3 className="text-[1.6rem] font-medium text-black">
                      {item.title}
                    </h3>
                    <span className="text-[#777777] font-medium text-[12px]">
                      {item.point}
                    </span>
                  </div>
                  <img
                    src={arrowRight}
                    alt=""
                    className="absolute right-0 top-[2rem] w-[1.15rem] h-[1.8rem]"
                  />
                </div>
                <div className="flex justify-end w-full absolute bottom-0 right-0">
                  <div className="flex justify-center items-center w-full max-w-[24.8rem] h-[3.8rem] _sm:w-[16.4rem] _ld:w-[22.4rem] _md:w-[20.4rem] bg-[#dddddd] rounded-[10px]">
                    <span className="text-[#B5B5B5] text-[13px] font-medium">
                      시작 전
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyChallengeStart;
