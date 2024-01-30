import PopularChallengeItems from "@/components/Home/PopularChallengeItems/PopularChallengeItems";
import SuggestionChallengeItems from "@/components/Home/SuggestionChallengeItems/SuggestionChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";

function Home() {
  return (
    <HomeLayout>
      <div className="pl-[2.2rem] mt-[1.5rem] flex flex-col gap-[1.5rem]">
        <SuggestionChallengeItems />
        <PopularChallengeItems />
      </div>
    </HomeLayout>
  );
}

export default Home;
