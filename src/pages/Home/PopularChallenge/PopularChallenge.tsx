import { useEffect, useState } from "react";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { useInView } from "react-intersection-observer";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useGetInfinitePopularInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { InstanceThumbnailDataType } from "@/types/homeInstance";

const PopularChallenge = () => {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<InstanceThumbnailDataType[]>([]);

  const { fetchNextPage, hasNextPage, isLoading } =
    useGetInfinitePopularInstance({ setChallenges });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!challenges) return;

  return (
    <HomeLayout>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <div className="mx-[2.2rem] mt-[1rem]">
          <VerticalChallengeItems data={challenges} />
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
        </div>
      )}
    </HomeLayout>
  );
};

export default PopularChallenge;
