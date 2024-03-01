import { useEffect, useRef, useState } from "react";
import getLatestChallenge from "@/apis/getLatestChallenge";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

const NewChallenge = () => {
  const [challenges, setChallenges] = useState<Data[]>([]);
  const [page, setPage] = useState(0);
  const isLoadingRef = useRef(false);
  const isLastRef = useRef(false);

  const loadMoreChallenges = async () => {
    if (isLoadingRef.current || isLastRef.current) return;
    isLoadingRef.current = true;

    const newData = await getLatestChallenge({ pageParams: page, size: 20 });

    if (newData.posts.length > 0) {
      setChallenges((prevChallenges) => [...prevChallenges, ...newData.posts]);
      isLastRef.current = newData.isLast;
    } else {
      isLastRef.current = true;
    }

    isLoadingRef.current = false;
  };

  const target = useInfiniteScroll({
    isLoadingRef: isLoadingRef,
    isLastRef: isLastRef,
    setPage: setPage,
  });

  useEffect(() => {
    loadMoreChallenges();
  }, [page]);

  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem]">
        <VerticalChallengeItems data={challenges} />
        <div
          ref={target}
          style={{ height: "10px", background: "transparent" }}
        />
      </div>
    </HomeLayout>
  );
};

export default NewChallenge;
