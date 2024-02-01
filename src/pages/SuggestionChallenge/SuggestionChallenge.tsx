import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { allChallengeData } from "@/data/allChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";

function SuggestionChallenge() {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={allChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default SuggestionChallenge;
