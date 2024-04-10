import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import PopularChallengeItems from "@/components/Home/PopularChallengeItems/PopularChallengeItems";
import SuggestionChallengeItems from "@/components/Home/SuggestionChallengeItems/SuggestionChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { Suspense } from "react";

function Home() {
  return (
    <HomeLayout>
      <Suspense fallback={<LoadingBox />}>
        <div className="pl-[2.2rem] mt-[1.5rem] flex flex-col gap-[1.5rem]">
          <SuggestionChallengeItems />
          <PopularChallengeItems />
        </div>
      </Suspense>
    </HomeLayout>
  );
}

export default Home;
