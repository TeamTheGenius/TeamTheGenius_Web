import prLienkIcon from "@/assets/icon/blue-link-icon.svg";
import "@/components/Certification/CertificationModal/CertificationPRLinkModal/CertificationPRLinkModal.css";

interface Props {
  prLinks: string[];
}

function CertificationPRLinkModal({ prLinks }: Props) {
  const onClickPRLink = (prLink: string) => {
    window.open(prLink);
  };
  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center w-full h-[12rem] absolute top-0 left-0">
        <div className="h-[8rem]  flex flex-col justify-center items-center">
          <p className="text-[1.7rem] font-medium">1일차 챌린지</p>
          <p className="text-[1.4rem] font-medium">24.03.09</p>
        </div>
        <div className="w-full px-[1.8rem]">
          <table className="w-full">
            <colgroup>
              <col className="w-[20%] min-w-[7rem] " />
              <col className="w-[60%] min-w-[7rem] " />
              <col className="w-[20%] min-w-[8.1rem] " />
            </colgroup>
            <thead>
              <tr className="text-[1.4rem] font-medium text-[#777]">
                <th className="text-left">번호</th>
                <th className="text-left">PR 링크</th>
                <th>업로드 시간</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="h-full pt-[12rem] w-full">
        <div className="scrollBar h-full">
          <table className="w-full">
            <colgroup>
              <col className="w-[20%] min-w-[7rem] " />
              <col className="w-[60%] min-w-[7rem] " />
              <col className="w-[20%] min-w-[8.1rem] " />
            </colgroup>
            <tbody>
              {prLinks.map((prLink, index) => (
                <tr key={index + 1}>
                  <td className="pb-[2rem] text-[1.5rem] font-medium">
                    {index + 1}.
                  </td>
                  <td className="pb-[2rem] pl-[1.3rem]">
                    <img
                      onClick={() => onClickPRLink(prLink)}
                      src={prLienkIcon}
                      alt="PR 링크 아이콘"
                      className=" cursor-pointer"
                    />
                  </td>
                  <td className="pb-[2rem] text-center text-[1.5rem] font-medium text-[#777]">
                    23:59
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CertificationPRLinkModal;
