import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";

function SuggestionChallenge() {
  return (
    <div className="mx-[2.2rem] mt-[1rem]">
      <VerticalChallengeItems data={suggestionChallengeData} />
    </div>
  );
}

export default SuggestionChallenge;
