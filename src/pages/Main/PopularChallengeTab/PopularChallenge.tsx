import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { popularChallengeData } from "@/data/pupularChallengeData";

function PopularChallenge() {
  return (
    <div className="pt-[4.6rem] mx-[2.2rem] mt-[1rem]">
      <VerticalChallengeItems data={popularChallengeData} />
    </div>
  );
}

export default PopularChallenge;
