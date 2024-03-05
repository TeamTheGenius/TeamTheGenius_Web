import Button from "@/components/Common/Button";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import DropDownIcon from "@/assets/icon/arrow-down.svg";
import checkIcon from "@/assets/icon/check-icon.svg";
import getRepoVertifyApi from "@/apis/getRepoVertifyApi";
type repoType = {
  label: string;
  value: string;
  id: string;
  repo?: string[];
  setRepoState: Dispatch<SetStateAction<string>>;
};
function Repo({ label, id, value, repo, setRepoState }: repoType) {
  const [selectedValue, setSelectedValue] = useState("");
  const gitRepoCheck = () => {
    getRepoVertifyApi({ repo: selectedValue });
    setRepoState(selectedValue);
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div className={`flex flex-col w-full`}>
        <div className="flex items-center ml-[6.5rem] _md:ml-0 _sm:ml-0">
          <label
            htmlFor={id}
            className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}
          >
            {label}
          </label>
          <div>
            <img src={checkIcon} alt="signIcon" />
          </div>
        </div>
        <div className="flex items-center ml-[6.5rem] _md:ml-0 _sm:ml-0 pt-[0.6rem] text-[#F64C4C]">
          <span>한번 지정된 Repository는 다시 변경될 수 없습니다</span>
        </div>
        <div className="flex items-end justify-center pt-[2.8rem]">
          <div className="w-8/12 _md:w-full _sm:w-full relative pr-[1.1rem]">
            <select
              id={id}
              value={value}
              onChange={handleDropdownChange}
              className="relative w-full bg-transparent text-[1.3rem] outline-none border-b-2 focus:border-black appearance-none"
            >
              <option className="hidden">{selectedValue}</option>
              {repo?.map((item: string, id: number) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <img
              src={DropDownIcon}
              alt="down icon"
              className="absolute top-0 right-7"
            />
          </div>
          <Button
            width="w-[8.7rem]"
            height="h-[3.1rem]"
            content="선택완료"
            fontWeight="font-medium"
            backgroundColor="bg-[#6893FF]"
            textColor="text-white"
            textSize="text-[1.3rem]"
            handleClick={gitRepoCheck}
          />
        </div>
      </div>
    </>
  );
}

export default Repo;
