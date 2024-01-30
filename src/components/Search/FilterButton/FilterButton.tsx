import { cls } from "@/utils/mergeTailwind";

interface Props {
  content: string;
  onClick: React.Dispatch<
    React.SetStateAction<"전체" | "모집중" | "진행중" | "완료">
  >;
  filter: "전체" | "모집중" | "진행중" | "완료";
}

function FilterButton({ content, filter, onClick }: Props) {
  const isActive = filter === content;
  return (
    <button
      onClick={() => onClick(content as Props["filter"])}
      className={cls(
        "h-[3rem] px-[1.2rem] text-[1.2rem] font-medium",
        isActive
          ? "bg-[#282828] rounded-[1.5rem] text-white leading-_normal"
          : "text-black leading-_normal"
      )}
    >
      {content}
    </button>
  );
}

export default FilterButton;
