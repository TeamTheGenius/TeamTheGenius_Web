import React, { useEffect, useRef } from "react";
import completeIcon from "@/assets/image/complete-icon.png";

const SignCompleteHeader: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          observer.unobserve(img);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <img
        ref={imageRef}
        data-src={completeIcon}
        alt="complete icon"
        className="w-[4.8rem]"
      />
      <h1 className="font-pretendard text-_h1 font-bold mb-12">
        {/* 가입한 프로필네임 */}
        <span>유저님,</span> 반갑습니다 <i>:)</i>
      </h1>
    </>
  );
};

export default SignCompleteHeader;
