import getOthersWeekCertification from "@/apis/getOthersWeekCertification";
import OthersAllCertificationLinkButton from "@/components/Certification/OthersCurrentCertification/OthersAllCertificationLinkButton/OthersAllCertificationLinkButton";
import OthersProfile from "@/components/Certification/OthersCurrentCertification/OthersProfile/OthersProfile";
import ThisWeekCertification from "@/components/Certification/ThisWeekCertification/ThisWeekCertification";
import Line from "@/components/Common/Line/Line";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";
import { decrypt } from "@/hooks/useCrypto";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { QUERY_KEY } from "@/constants/queryKey";

interface Data {
  userId: number;
  nickname: string;
  certifications: CertificationData[];
  frameId: number;
  profile: {
    encodedFile: string;
  };
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

function OthersCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const [ref, inView] = useInView();
  const [certifications, setcertifications] = useState<Data[]>([]);

  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      QUERY_KEY.INFINITE_OTHERS_WEEK_CERTIFICATIONS_OF_INSTANCE,
      { decryptedInstanceId },
    ],
    queryFn: ({ pageParam = 0 }) =>
      decryptedInstanceId
        ? getOthersWeekCertification({
            pageParams: pageParam,
            instanceId: parseInt(decryptedInstanceId),
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
              {item.profile.encodedFile === "none" ? (
                <OthersProfile
                  imgSrc={basicProfileImage}
                  alt="프로필 이미지"
                  nickName={item.nickname}
                  frameId={item.frameId}
                />
              ) : (
                <OthersProfile
                  imgSrc={makeBase64IncodedImage({
                    uri: item.profile.encodedFile,
                    format: "jpg",
                  })}
                  alt="프로필 이미지"
                  nickName={item.nickname}
                  frameId={item.frameId}
                />
              )}

              <OthersAllCertificationLinkButton
                userId={item.userId}
                instanceId={parseInt(decryptedInstanceId)}
              />
            </div>
            <ThisWeekCertification data={certifications[index]} />
          </div>
          {index != othersAllCertificationData.length - 1 && <Line />}
          <div
            ref={ref}
            style={{ height: "10px", background: "transparent" }}
          />
        </div>
      ))}
    </div>
  );
}

export default OthersCurrentCertification;
