import { PATH } from "@/constants/path";
import Tab from "../Tab/Tab";

function Tabs() {
  return (
    <div className="flex justify-center gap-[1.8rem]">
      <Tab content="홈" path={PATH.HOME_TAB} />
      <Tab content="신규" path={PATH.NEW_CHALLENGE_TAB} />
      <Tab content="인기" path={PATH.POPULAR_CHALLENGE_TAB} />
      <Tab content="추천" path={PATH.SUGGESTION_CHALLENGE_TAB} />
    </div>
  );
}

export default Tabs;
