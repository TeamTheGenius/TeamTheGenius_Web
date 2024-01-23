import FilterButton from "../FilterButton/FilterButton";

interface Props {
  setFilter: React.Dispatch<
    React.SetStateAction<"전체" | "모집중" | "진행중" | "완료">
  >;
  filter: "전체" | "모집중" | "진행중" | "완료";
}

function FilterButtons({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-[1rem]">
      <FilterButton content="전체" filter={filter} onClick={setFilter} />
      <FilterButton content="모집중" filter={filter} onClick={setFilter} />
      <FilterButton content="진행중" filter={filter} onClick={setFilter} />
      <FilterButton content="완료" filter={filter} onClick={setFilter} />
    </div>
  );
}

export default FilterButtons;
