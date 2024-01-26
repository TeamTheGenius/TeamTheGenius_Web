import FilterButtons from "@/components/Main/FilterButtons/FilterButtons";
import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { newChallengeData } from "@/data/newChallengeData";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Search() {
  const { searchQuery } = useOutletContext<Props>();
  const [filter, setFilter] = useState<"전체" | "모집중" | "진행중" | "완료">(
    "전체"
  );
  return (
    <div className="px-[2.2rem]">
      <p>{searchQuery}</p>
      <div className="px-[1rem] py-[1rem]">
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>
      <VerticalChallengeItems data={newChallengeData} />
    </div>
  );
}

export default Search;
