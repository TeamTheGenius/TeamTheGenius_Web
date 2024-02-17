import test from "@/assets/image/google-logo.png";

interface CertificationResult {
  imgSrc: string;
  nickName: string;
  index: number;
  date: string;
  result: string;
}

export const othersCertificationResultData: CertificationResult[] = [];

for (let i = 1; i <= 4; i++) {
  const nickName = `사용자${i}`;
  const date = `2024-01/${i}`;
  const randomResult = Math.random() < 0.5 ? "success" : "fail";

  othersCertificationResultData.push({
    imgSrc: test,
    nickName: nickName,
    index: i,
    date: date,
    result: randomResult,
  });
}
