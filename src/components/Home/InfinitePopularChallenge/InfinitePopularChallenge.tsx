import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useGetInfinitePopularInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { InstanceThumbnailDataType } from "@/types/homeInstance";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function InfinitePopularChallenge() {
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
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <>
          <VerticalChallengeItems data={challenges} />
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
        </>
      )}
    </>
  );
}

export default InfinitePopularChallenge;