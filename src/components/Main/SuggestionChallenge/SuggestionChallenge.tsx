import { useState } from "react";
import FilterButtons from "../FilterButtons/FilterButtons";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";
import VerticalChallengeItems from "../VerticalChallengeItems/VerticalChallengeItems";

interface FilterProps {
  filter: "전체" | "모집중" | "진행중" | "완료";
}

function SuggestionChallenge() {
  const [filter, setFilter] = useState<FilterProps["filter"]>("전체");
  return (
    <div className="mx-[2.2rem]">
      <div className="ml-[1rem] h-[3rem] mx-[1rem] my-[1rem]">
        <FilterButtons setFilter={setFilter} filter={filter} />
      </div>
      <VerticalChallengeItems data={suggestionChallengeData} />
    </div>
  );
}

export default SuggestionChallenge;
