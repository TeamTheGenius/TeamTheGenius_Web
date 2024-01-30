import VerticalChallengeItems from "@/components/Main/VerticalChallengeItems/VerticalChallengeItems";
import { popularChallengeData } from "@/data/pupularChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";

function PopularChallenge() {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={popularChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default PopularChallenge;
