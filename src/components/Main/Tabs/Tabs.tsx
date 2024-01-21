import Tab from "../Tab/Tab";

function Tabs() {
  return (
    <div className="flex">
      <Tab content="홈" isActive={true} />
      <Tab content="인기" isActive={false} />
      <Tab content="신규" isActive={false} />
      <Tab content="추천" isActive={false} />
    </div>
  );
}

export default Tabs;
