import OthersAllCertificationLinkButton from "@/components/Certification/OthersCurrentCertification/OthersAllCertificationLinkButton/OthersAllCertificationLinkButton";
import OthersProfile from "@/components/Certification/OthersCurrentCertification/OthersProfile/OthersProfile";
import ThisWeekCertification from "@/components/Certification/ThisWeekCertification/ThisWeekCertification";
import Line from "@/components/Common/Line/Line";
import { decrypt } from "@/hooks/useCrypto";
import { makeBase64IncodedImage } from "@/utils/makeBase64IncodedImage";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import basicProfileImage from "@/assets/image/basic-profile-image-gray.png";
import { AllWeekCertificationDataType } from "@/types/certificationType";
import { useGetAllCertificationWeek } from "@/hooks/queries/useCertificationQuery";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

function OthersCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const [ref, inView] = useInView();

  const { fetchNextPage, hasNextPage, isLoading, data } =
    useGetAllCertificationWeek({
      decryptedInstanceId,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="mt-[3.8rem] _sm:mt-[2.4rem] flex flex-col gap-[3rem] justify-center items-center px-[2.2rem] pb-[2.2rem]">
        {data?.pages.map((page, pageIndex) =>
          page.posts.map(
            (post: AllWeekCertificationDataType, postIndex: number) => (
              <div
                key={`${pageIndex}-${postIndex}`}
                className="flex flex-col gap-[2.4rem] w-full max-w-[48.5rem] _sm:max-w-[36rem] "
              >
                <div>
                  <div className="flex justify-between mb-[2.3rem] _sm:mb-[1.7rem]">
                    {post.profile.encodedFile === "none" ? (
                      <OthersProfile
                        imgSrc={basicProfileImage}
                        alt="프로필 이미지"
                        nickName={post.nickname}
                        frameId={post.frameId}
                      />
                    ) : (
                      <OthersProfile
                        imgSrc={makeBase64IncodedImage({
                          uri: post.profile.encodedFile,
                          format: "jpg",
                        })}
                        alt="프로필 이미지"
                        nickName={post.nickname}
                        frameId={post.frameId}
                      />
                    )}

                    <OthersAllCertificationLinkButton
                      userId={post.userId}
                      instanceId={parseInt(decryptedInstanceId)}
                    />
                  </div>
                  <ThisWeekCertification data={post} />
                </div>
                {postIndex != page.posts.length - 1 && <Line />}
                <div
                  ref={ref}
                  style={{ height: "10px", background: "transparent" }}
                />
              </div>
            )
          )
        )}
      </div>
      {isLoading && <LoadingBox />}
    </>
  );
}

export default OthersCurrentCertification;
