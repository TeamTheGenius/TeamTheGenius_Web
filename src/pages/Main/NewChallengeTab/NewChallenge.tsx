import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { newChallengeData } from "@/data/newChallengeData";

function NewChallenge() {
  return (
    <div className="mx-[2.2rem] mt-[1rem]">
      <VerticalChallengeItems data={newChallengeData} />
    </div>
  );
}

export default NewChallenge;
