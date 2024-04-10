import getSearchedChallengeItem from "@/apis/getSearchedChallengeItem";
import { QUERY_KEY } from "@/constants/queryKey";
import { InstanceThumbnailDataType } from "@/types/homeInstance";
import { useInfiniteQuery, useQuery } from "react-query";
import getRecommendChallenge from "@/apis/getRecommendedChallenge";
import getPopularChallenge from "@/apis/getPopularChallenge";
import getLatestChallenge from "@/apis/getLatestChallenge";

interface GetSearchInfiniteActivityInstanceType {
  searchQuery: string;
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetSearchInfiniteActivityInstance = ({
  searchQuery,
  setChallenges,
}: GetSearchInfiniteActivityInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
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
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, refetch, isLoading };
};

interface GetSearchInfiniteAllInstanceType {
  searchQuery: string;
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetSearchInfiniteAllInstance = ({
  searchQuery,
  setChallenges,
}: GetSearchInfiniteAllInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
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
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, refetch, isLoading };
};

interface GetSearchInfiniteDoneInstanceType {
  searchQuery: string;
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetSearchInfiniteDoneInstance = ({
  searchQuery,
  setChallenges,
}: GetSearchInfiniteDoneInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
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
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, refetch, isLoading };
};

interface GetSearchInfinitePreActivityInstanceType {
  searchQuery: string;
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetSearchInfinitePreActivityInstance = ({
  searchQuery,
  setChallenges,
}: GetSearchInfinitePreActivityInstanceType) => {
  const { fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
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
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, refetch, isLoading };
};

interface GetInfiniteRecommendInstanceType {
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetInfiniteRecommendInstance = ({
  setChallenges,
}: GetInfiniteRecommendInstanceType) => {
  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_RECOMMENDED_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getRecommendChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const challenges = res.pages.map((page) => page.posts).flat();
      setChallenges(challenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, isLoading };
};

interface GetInfinitePopularInstanceType {
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}
export const useGetInfinitePopularInstance = ({
  setChallenges,
}: GetInfinitePopularInstanceType) => {
  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_POPULAR_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getPopularChallenge({ pageParams: pageParam, size: 10 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const challenges = res.pages.map((page) => page.posts).flat();
      setChallenges(challenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, isLoading };
};

interface GetInfiniteLastestInstanceType {
  setChallenges: React.Dispatch<
    React.SetStateAction<InstanceThumbnailDataType[]>
  >;
}

export const useGetInfiniteLastestInstance = ({
  setChallenges,
}: GetInfiniteLastestInstanceType) => {
  const { fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEY.INFINITE_LASTEST_CHALLENGES],
    queryFn: ({ pageParam = 0 }) =>
      getLatestChallenge({ pageParams: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.page + 1;
    },
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setChallenges(newChallenges);
    },
    cacheTime: 0,
  });
  return { fetchNextPage, hasNextPage, isLoading };
};

interface GetRecommendInstanceDataType {
  posts: InstanceThumbnailDataType[];
}
export const useGetRecommendInstance = () => {
  const { data } = useQuery<GetRecommendInstanceDataType>({
    queryKey: [QUERY_KEY.RECOMMENDED_CHALLENGES],
    queryFn: () => getRecommendChallenge({ pageParams: 0, size: 7 }),
    suspense: true,
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
    suspense: true,
  });
  return { data };
};
