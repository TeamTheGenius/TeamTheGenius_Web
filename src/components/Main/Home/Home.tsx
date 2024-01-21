import MoreButton from "../MoreButton/MoreButton";
import Title from "../Title/Title";

function Home() {
  return (
    <div className="flex gap-[2.851rem] items-center">
      <Title content="추천 챌린지" />
      <MoreButton keyUrl="suggestion" />
    </div>
  );
}

export default Home;
