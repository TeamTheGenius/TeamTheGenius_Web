import { suggestionChallengeData } from "@/data/suggestionChallengeData";
import VerticalChallengeItems from "../VerticalChallengeItems/VerticalChallengeItems";

function SuggestionChallenge() {
  return (
    <div className="mx-[2.2rem]">
      <VerticalChallengeItems data={suggestionChallengeData} />
    </div>
  );
}

export default SuggestionChallenge;
