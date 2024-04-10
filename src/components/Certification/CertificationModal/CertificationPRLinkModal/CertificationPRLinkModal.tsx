import "@/components/Certification/CertificationModal/CertificationPRLinkModal/CertificationPRLinkModal.css";
import openLinkIcon from "@/assets/icon/bordered-blue-right-arrow-icon.svg";

interface Props {
  prLinks: string[];
  certificationAttempt: number;
  certificatedAt: string;
}

function CertificationPRLinkModal({
  prLinks,
  certificatedAt,
  certificationAttempt,
}: Props) {
  return (
    <>
      <div className="bg-[#282828] flex flex-col justify-center items-center w-full h-[8rem] absolute top-0 left-0">
        <div className=" text-white w-full h-[8rem]  flex flex-col justify-center items-center">
          <p className="text-[1.7rem] font-medium">
            {certificationAttempt}일차 챌린지
          </p>
          <p className="text-[1.4rem] font-medium">{certificatedAt}</p>
        </div>
      </div>
      <div className="bg-white px-[2rem] pt-[1.3rem] flex items-center justify-center w-full h-[4rem] absolute top-[8rem] left-0">
        <p className="text-[1.4rem] font-medium text-[#777] basis-[5rem] shrink-0 text-center">
          번호
        </p>
        <p className="text-[1.4rem] font-medium text-[#777] basis-[10rem] shrink-0 grow text-center mr-[5.5rem]">
          PR 링크
        </p>
      </div>

      <div className="pt-[12rem]  w-full h-full">
        <div className="scrollBar flex flex-col gap-[2rem] w-full h-full self-start">
          {prLinks.map((link, index) => (
            <div key={index} className="flex">
              <p className="text-[1.4rem] font-medium text-black basis-[5rem] shrink-0 text-center ">
                {index + 1}.
              </p>
              <a
                className=" text-[1.3rem] font-medium text-[#3A8ECD] basis-[10rem] shrink-0 grow text-center"
                href={link}
              >
                {prLinks.length - index}번째 PR
              </a>
              <img
                src={openLinkIcon}
                alt="PR 보기 아이콘"
                className="mr-[3rem] w-[2.5rem] h-[2.5rem]"
              ></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CertificationPRLinkModal;
