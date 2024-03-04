import checkIcon from "@/assets/icon/red-check-icon.svg";
interface Props {
  repository: string;
}
function MyRepository({ repository }: Props) {
  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">설정된 Repository</p>
      </div>
      <p className="text-[1.4rem] font-normal break-all pl-[2.5rem] ">
        {repository}
      </p>
    </>
  );
}

export default MyRepository;
