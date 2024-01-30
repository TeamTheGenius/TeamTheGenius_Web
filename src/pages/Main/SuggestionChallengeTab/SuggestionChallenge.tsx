import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { suggestionChallengeData } from "@/data/suggestionChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";

function SuggestionChallenge() {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={suggestionChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default SuggestionChallenge;
