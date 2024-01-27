import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { popularChallengeData } from "@/data/pupularChallengeData";

function PopularChallenge() {
  return (
    <div className="mx-[2.2rem] mt-[1rem]">
      <VerticalChallengeItems data={popularChallengeData} />
    </div>
  );
}

export default PopularChallenge;
