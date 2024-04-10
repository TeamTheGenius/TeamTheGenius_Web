import test from "@/assets/image/google-logo.png";

interface CertificationResult {
  index: number;
  date: string;
  result: string;
}

const othersCertificationResultData: CertificationResult[] = [];

for (let i = 1; i <= 31; i++) {
  const date = `2024-01/${i}`;
  const randomResult = Math.random() < 0.5 ? "success" : "fail";

  othersCertificationResultData.push({
    index: i,
    date: date,
    result: randomResult,
  });
}

export const othersAllCertificationData = [
  {
    id: 1,
    nickName: "선아",
    githubId: "seona",
    imgSrc: test,
    certificationInfo: othersCertificationResultData,
  },
  {
    id: 2,
    nickName: "희연",
    githubId: "heeyeon",
    imgSrc: test,
    certificationInfo: othersCertificationResultData,
  },
  {
    id: 3,
    nickName: "한수",
    githubId: "hansu",
    imgSrc: test,
    certificationInfo: othersCertificationResultData,
  },
  {
    id: 4,
    nickName: "도형",
    githubId: "dozzi",
    imgSrc: test,
    certificationInfo: othersCertificationResultData,
  },
  {
    id: 5,
    nickName: "소희",
    githubId: "sohee",
    imgSrc: test,
    certificationInfo: othersCertificationResultData,
  },
];
