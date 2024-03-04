import FilterButton from "../FilterButton/FilterButton";
import { PATH } from "@/constants/path";

function FilterButtons() {
  return (
    <div className="flex gap-[1rem]">
      <FilterButton content="전체" path={PATH.SEARCH_ALL} />
      <FilterButton content="모집중" path={PATH.SEARCH_PREACTIVITY} />
      <FilterButton content="진행중" path={PATH.SEARCH_ACTIVITY} />
      <FilterButton content="완료" path={PATH.SEARCH_DONE} />
    </div>
  );
}

export default FilterButtons;
