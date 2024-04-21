import getSearchedChallengeItem from "@/apis/getSearchedChallengeItem";
import { QUERY_KEY } from "@/constants/queryKey";
import { InstanceThumbnailDataType } from "@/types/homeInstance";
import { useInfiniteQuery, useQuery } from "react-query";
import getRecommendChallenge from "@/apis/getRecommendedChallenge";
import getPopularChallenge from "@/apis/getPopularChallenge";
import getLatestChallenge from "@/apis/getLatestChallenge";

interface GetSearchInfiniteActivityInstanceType {
  searchQuery: string;
}
export const useGetSearchInfiniteActivityInstance = ({
  searchQuery,
}: GetSearchInfiniteActivityInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading, data } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.INFINITE_SEARCHED_ACTIVITY_CHALLENGES],
      queryFn: ({ pageParam = 0 }) =>
        getSearchedChallengeItem({
          pageParams: pageParam,
          size: 20,
          keyword: searchQuery,
          progress: "ACTIVITY",
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
    });
  return { fetchNextPage, hasNextPage, refetch, isLoading, data };
};

interface GetSearchInfiniteAllInstanceType {
  searchQuery: string;
}
export const useGetSearchInfiniteAllInstance = ({
  searchQuery,
}: GetSearchInfiniteAllInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading, data } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.INFINITE_SEARCHED_ACTIVITY_CHALLENGES],
      queryFn: ({ pageParam = 0 }) =>
        getSearchedChallengeItem({
          pageParams: pageParam,
          size: 20,
          keyword: searchQuery,
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
    });
  return { fetchNextPage, hasNextPage, refetch, isLoading, data };
};

interface GetSearchInfiniteDoneInstanceType {
  searchQuery: string;
}
export const useGetSearchInfiniteDoneInstance = ({
  searchQuery,
}: GetSearchInfiniteDoneInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading, data } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.INFINITE_SEARCHED_ACTIVITY_CHALLENGES],
      queryFn: ({ pageParam = 0 }) =>
        getSearchedChallengeItem({
          pageParams: pageParam,
          size: 20,
          keyword: searchQuery,
          progress: "DONE",
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
    });
  return { fetchNextPage, hasNextPage, refetch, isLoading, data };
};

interface GetSearchInfinitePreActivityInstanceType {
  searchQuery: string;
}
export const useGetSearchInfinitePreActivityInstance = ({
  searchQuery,
}: GetSearchInfinitePreActivityInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading, data } =
    useInfiniteQuery({
      queryKey: [QUERY_KEY.INFINITE_SEARCHED_ACTIVITY_CHALLENGES],
      queryFn: ({ pageParam = 0 }) =>
        getSearchedChallengeItem({
          pageParams: pageParam,
          size: 20,
          keyword: searchQuery,
          progress: "PREACTIVITY",
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.isLast ? undefined : lastPage.page + 1;
      },
    });
  return { fetchNextPage, hasNextPage, refetch, isLoading, data };
};

export const useGetInfiniteRecommendInstance = () => {
  const { fetchNextPage, hasNextPage, isLoading, data } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_RECOMMENDED_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getRecommendChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
  });
  return { fetchNextPage, hasNextPage, isLoading, data };
};

export const useGetInfinitePopularInstance = () => {
  const { fetchNextPage, hasNextPage, isLoading, data } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_POPULAR_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getPopularChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
  });
  return { fetchNextPage, hasNextPage, isLoading, data };
};

export const useGetInfiniteLastestInstance = () => {
  const { fetchNextPage, isLoading, hasNextPage, data } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_LASTEST_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getLatestChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
  });
  return { fetchNextPage, hasNextPage, isLoading, data };
};

interface GetRecommendInstanceDataType {
  posts: InstanceThumbnailDataType[];
}
export const useGetRecommendInstance = () => {
  const { data } = useQuery<GetRecommendInstanceDataType>({
    queryKey: [QUERY_KEY.RECOMMENDED_CHALLENGES],
    queryFn: () => getRecommendChallenge({ pageParams: 0, size: 7 }),
  });
  return { data };
};

interface GetPopularInstanceDataType {
  posts: InstanceThumbnailDataType[];
}

export const useGetPopularInstance = () => {
  const { data } = useQuery<GetPopularInstanceDataType>({
    queryKey: [QUERY_KEY.POPULAR_CHALLENGES],
    queryFn: () => getPopularChallenge({ pageParams: 0, size: 7 }),
  });
  return { data };
};
