import { EmptyDataView } from "@/components/Common/EmptyDataView/EmptyDataView";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import VerticalChallengeItems from "@/components/Common/VerticalChallengeItems/VerticalChallengeItems";
import { useGetInfiniteLastestInstance } from "@/hooks/queries/useHomeInstanceQuery";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function InfiniteNewChallenge() {
  const [ref, inView] = useInView();

  const { fetchNextPage, hasNextPage, isLoading, data } =
    useGetInfiniteLastestInstance();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {!data?.pages[0].posts.length && (
        <div className="mt-[8rem]">
          <EmptyDataView>
            <EmptyDataView.FireHatchIcon />
            <EmptyDataView.Title title="현재 새로 나온 챌린지가 없습니다" />
          </EmptyDataView>
        </div>
      )}
      <div className="w-full max-w-[72.2rem] grid grid-cols-4 gap-x-[2.2rem] gap-y-[0.3rem] _md:grid-cols-3 _sm:grid-cols-2">
        {data?.pages.map((page) => (
          <VerticalChallengeItems key={page.page} data={page.posts} />
        ))}
        <div ref={ref} style={{ height: "10px", background: "transparent" }} />
      </div>

      {isLoading && <LoadingBox />}
    </>
  );
}

export default InfiniteNewChallenge;
