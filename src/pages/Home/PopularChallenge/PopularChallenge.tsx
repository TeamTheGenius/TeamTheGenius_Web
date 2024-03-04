import { useEffect, useState } from "react";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import getPopularChallenge from "@/apis/getPopularChallenge";
import { useInView } from "react-intersection-observer";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

const PopularChallenge = () => {
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const loadChallenges = async () => {
    const newData = await getPopularChallenge({ pageParams: page, size: 20 });
    setChallenges([...challenges, ...newData.posts]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadChallenges();
    }
  }, [inView]);

  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={challenges} />
        <div ref={ref} style={{ height: "10px", background: "transparent" }} />
      </div>
    </HomeLayout>
  );
};

export default PopularChallenge;
