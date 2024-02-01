import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { newChallengeData } from "@/data/newChallengeData";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";

function NewChallenge() {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={newChallengeData} />
      </div>
    </HomeLayout>
  );
}

export default NewChallenge;
