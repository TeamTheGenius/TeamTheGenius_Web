import MyChallengeHeader from "@/components/Main/MyChallenge/MyChallengeHeader/MyChallengeHeader";
import "@/pages/MyChallenge/MyChallengeStyle.css";
import { useRoutes } from "react-router-dom";
import MyChallengeProgress from "./MyChallengeProgress/MyChallengeProgress";
import MyChallengeComplete from "./MyChallengeComplete/MyChallengeComplete";
import MyChallengeStart from "./MyChallengeStart/MyChallengeStart";

const MyChallenge = () => {
  const routes = useRoutes([
    {
      path: "start",
      element: <MyChallengeStart />,
    },
    { path: "progress", element: <MyChallengeProgress /> },
    { path: "completed", element: <MyChallengeComplete /> },
  ]);

  return (
    <>
      <div className="w-full relative px-[2rem]">
        <MyChallengeHeader />
        {routes}
      </div>
    </>
  );
};

export default MyChallenge;
