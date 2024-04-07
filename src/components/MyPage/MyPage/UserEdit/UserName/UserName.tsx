import { MyProfileDataType } from "@/types/profileType";

function UserName({ data }: { data?: MyProfileDataType }) {
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
