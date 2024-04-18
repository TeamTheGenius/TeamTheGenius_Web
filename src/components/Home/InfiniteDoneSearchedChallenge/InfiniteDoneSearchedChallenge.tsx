import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useGetSearchInfiniteDoneInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { InstanceThumbnailDataType } from "@/types/homeInstance";

interface Props {
  searchQuery: string;
  searchEnter: string;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function InfiniteDoneSearchedChallenge({
  searchQuery,
  searchEnter,
  setSearchEnter,
}: Props) {
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<InstanceThumbnailDataType[]>([]);

  const { fetchNextPage, hasNextPage, refetch, isLoading } =
    useGetSearchInfiniteDoneInstance({ searchQuery, setChallenges });

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

export default InfiniteDoneSearchedChallenge;
