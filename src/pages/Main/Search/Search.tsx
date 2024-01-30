import FilterButtons from "@/components/Main/FilterButtons/FilterButtons";
import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { newChallengeData } from "@/data/newChallengeData";
import { useState } from "react";
import HomeHeader from "@/components/Main/HomeHeader/HomeHeader";

function Search() {
  const [filter, setFilter] = useState<"전체" | "모집중" | "진행중" | "완료">(
    "전체"
  );
  return (
    <div>
      <div className="max-w-[77.3rem] w-full z-10 bg-white fixed top-0">
        <div className="my-[1.1rem]">
          <HomeHeader />
        </div>
        <div className="px-[3.2rem] py-[1rem]">
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="px-[2.2rem]">
        <div className="pt-[11.7rem] _sm:pt-[10.8rem]">
          <VerticalChallengeItems data={newChallengeData} />
        </div>
      </div>
    </div>
  );
}

export default Search;
