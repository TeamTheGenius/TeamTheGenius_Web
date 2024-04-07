import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useGetSearchInfinitePreActivityInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";
import { InstanceThumbnailDataType } from "@/types/homeInstance";

interface Outlet {
  searchQuery: string;
  searchEnter: string;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function PreActivitySearch() {
  const { searchQuery, searchEnter, setSearchEnter } =
    useOutletContext<Outlet>();

  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<InstanceThumbnailDataType[]>([]);

  const { fetchNextPage, hasNextPage, refetch, isLoading } =
    useGetSearchInfinitePreActivityInstance({ setChallenges, searchQuery });

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

export default PreActivitySearch;
