interface CertificationResult {
  index: number;
  date: string;
  result: string;
}

export const myCertificationResultData: CertificationResult[] = [];

for (let i = 1; i <= 4; i++) {
  const date = `2024-03-0${i}`;
  const randomResult = Math.random() < 0.5 ? "success" : "fail";

  myCertificationResultData.push({
    index: i,
    date: date,
    result: randomResult,
  });
}
