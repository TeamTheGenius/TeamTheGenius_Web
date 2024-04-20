import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useGetSearchInfiniteActivityInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { InstanceThumbnailDataType } from "@/types/homeInstance";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  searchQuery: string;
  searchEnter: boolean;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfiniteActivitySearchedChallenge({
  searchQuery,
  searchEnter,
  setSearchEnter,
}: Props) {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<InstanceThumbnailDataType[]>([]);

  const { fetchNextPage, hasNextPage, refetch, isLoading } =
    useGetSearchInfiniteActivityInstance({ searchQuery, setChallenges });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (searchEnter) {
      refetch();
      setSearchEnter(false);
    }
  }, [searchEnter]);

  if (!challenges) return null;
  if (isLoading) return <LoadingBox />;

  return (
    <>
      <VerticalChallengeItems data={challenges} />
      <div ref={ref} style={{ height: "10px" }}></div>
    </>
  );
}

export default InfiniteActivitySearchedChallenge;