import getSearchedChallengeItem from "@/apis/getSearchedChallengeItem";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useOutletContext } from "react-router-dom";

interface Data {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
}

interface Outlet {
  searchQuery: string;
}

function AllSearch() {
  const { searchQuery } = useOutletContext<Outlet>();
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [challenges, setChallenges] = useState<Data[]>([]);

  const loadChallenges = async () => {
    const newData = await getSearchedChallengeItem({
      pageParams: page,
      size: 10,
      keyword: searchQuery,
    });

    setChallenges([...challenges, ...newData.posts]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      loadChallenges();
    }
  }, [inView]);

  return (
    <>
      <VerticalChallengeItems data={challenges} />
      <div ref={ref} style={{ height: "10px" }}></div>
    </>
  );
}

export default AllSearch;
