import { Data } from "@/types/myProfileData";

function UserName({ data }: { data?: Data }) {
  return (
    <div className="flex flex-col items-center mb-[4rem]">
      <span className="text-[1.8rem] font-medium">{data?.identifier}</span>
      <span className="text-[1.4rem] font-medium text-[#777777]">
        {data?.nickname}
      </span>
    </div>
  );
}
export default UserName;
