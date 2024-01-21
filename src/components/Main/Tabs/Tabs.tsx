import Tab from "../Tab/Tab";

function Tabs() {
  return (
    <div className="flex">
      <Tab content="홈" keyUrl="home" />
      <Tab content="인기" keyUrl="popular" />
      <Tab content="신규" keyUrl="new" />
      <Tab content="추천" keyUrl="suggestion" />
    </div>
  );
}

export default Tabs;
