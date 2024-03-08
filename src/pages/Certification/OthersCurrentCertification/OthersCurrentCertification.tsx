import getOthersWeekCertification from "@/apis/getOthersWeekCertification";
import OthersAllCertificationLinkButton from "@/components/Certification/OthersCurrentCertification/OthersAllCertificationLinkButton/OthersAllCertificationLinkButton";
import OthersProfile from "@/components/Certification/OthersCurrentCertification/OthersProfile/OthersProfile";
import ThisWeekCertification from "@/components/Certification/ThisWeekCertification/ThisWeekCertification";
import Line from "@/components/Common/Line/Line";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";

interface Data {
  userId: number;
  nickname: string;
  certifications: CertificationData[];
  profile: {
    encodedFile: string;
  };
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: string;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

function OthersCurrentCertification() {
  const { id } = useParams();
  const [ref, inView] = useInView();
  const [certifications, setcertifications] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getOthersWeekCertification", { id }],
    queryFn: ({ pageParam = 0 }) =>
      id
        ? getOthersWeekCertification({
            pageParams: pageParam,
            instanceId: parseInt(id),
            size: 20,
          })
        : Promise.resolve({ isLast: true, page: 0, posts: [] }),
    getNextPageParam: (lastPage) => {
      return !lastPage.isLast ? lastPage.page + 1 : undefined;
    },
    onSuccess: (res) => {
      const newChallenges = res.pages.map((page) => page.posts).flat();
      setcertifications(newChallenges);
    },
    cacheTime: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!certifications) return null;
  if (!id) return null;

  return (
    <div className="mt-[3.8rem] _sm:mt-[2.4rem] flex flex-col gap-[3rem] justify-center items-center px-[2.2rem] pb-[2.2rem]">
      {certifications.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-[2.4rem] w-full max-w-[48.5rem] _sm:max-w-[36rem] "
        >
          <div>
            <div className="flex justify-between mb-[2.3rem] _sm:mb-[1.7rem]">
              <OthersProfile
                imgSrc={item.profile.encodedFile}
                alt="프로필 이미지"
                nickName={item.nickname}
              />
              <OthersAllCertificationLinkButton
                userId={item.userId}
                instanceId={parseInt(id)}
              />
            </div>
            <ThisWeekCertification data={certifications[index]} />
          </div>
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
          {index != othersAllCertificationData.length - 1 && <Line />}
        </div>
      ))}
    </div>
  );
}

export default OthersCurrentCertification;
