interface CertificationResult {
  nickName: string;
  index: number;
  date: string;
  result: string;
}

export const myCertificationResultData: CertificationResult[] = [];

for (let i = 1; i <= 31; i++) {
  const nickName = `사용자${i}`;
  const date = `2024-01/${i}`;
  const randomResult = Math.random() < 0.5 ? "success" : "fail";

  myCertificationResultData.push({
    nickName: nickName,
    index: i,
    date: date,
    result: randomResult,
  });
}
