import { PATH } from "@/constants/path";
import Tab from "../Tab/Tab";

function Tabs() {
  return (
    <div className="flex justify-center gap-[1.8rem]">
      <Tab content="홈" path={PATH.HOME} />
      <Tab content="신규" path={PATH.NEW_CHALLENGE} />
      <Tab content="인기" path={PATH.POPULAR_CHALLENGE} />
      <Tab content="추천" path={PATH.SUGGESTION_CHALLENGE} />
    </div>
  );
}

export default Tabs;
