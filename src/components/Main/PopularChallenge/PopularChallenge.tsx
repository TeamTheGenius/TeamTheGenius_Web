import { popularChallengeData } from "@/data/pupularChallengeData";
import VerticalChallengeItems from "../VerticalChallengeItems/VerticalChallengeItems";

function PopularChallenge() {
  return (
    <div className="mx-[2.2rem]">
      <VerticalChallengeItems data={popularChallengeData} />
    </div>
  );
}

export default PopularChallenge;
