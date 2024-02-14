import { PATH } from "@/constants/path";
import NextArrowIcon from "../NextArrowIcon/NextArrowIcon";

interface Props {
  id: number;
}

function ChallengeDetailLinkButton({ id }: Props) {
  return (
    <a
      href={`${PATH.CHALLENGE_DETAIL}/${id}/`}
      className="w-[11.5rem] h-[3.2rem] rounded-[0.6rem] bg-white flex justify-center items-center gap-[0.9rem]"
    >
      <p className="text-[1.1rem] font-medium">상세 페이지 보기</p>
      <NextArrowIcon />
    </a>
  );
}

export default ChallengeDetailLinkButton;
