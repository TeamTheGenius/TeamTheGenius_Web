import Header from "@/components/Common/Header/Header";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import UserInformationEditForm from "@/components/MyPage/UserInfoEdit/UserInformationEditForm/UserInformationEditForm";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

const UserInfoEdit = () => {
  return (
    <>
      <MobCard>
        <Header content="회원 정보 수정" />
        <div className="w-full pt-[7.8rem] px-[2.2rem] flex flex-col justify-center items-center h-full">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                FallbackComponent={CommonGetErrorFallback}
              >
                <Suspense fallback={<LoadingBox />}>
                  <UserInformationEditForm />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </MobCard>
    </>
  );
};

export default UserInfoEdit;
