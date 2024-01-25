import VerticalChallengeItems from "../VerticalChallengeItems/VerticalChallengeItems";
import { newChallengeData } from "@/data/newChallengeData";

function NewChallenge() {
  return (
    <div className="mx-[2.2rem]">
      <VerticalChallengeItems data={newChallengeData} />
    </div>
  );
}

export default NewChallenge;
