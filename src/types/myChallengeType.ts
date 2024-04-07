export interface MyChallengePreActivityDataType {
  instanceId: number;
  title: string;
  remainDays: number;
  participantCount: number;
  pointPerPerson: number;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

export interface MyChallengeDoneDataType {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  joinResult: "SUCCESS" | "FAIL";
  canGetReward: boolean;
  numOfPointItem: number;
  rewardedPoints: number;
  achievementRate: number;
  itemId: number;
  fileResponse: File;
}

export interface MyChallengeActivityDataType {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  repository: string;
  certificateStatus: "패스 완료" | "인증 갱신" | "인증하기";
  numOfPassItem: number;
  canUsePassItem: boolean;
  itemId: number;
  fileResponse: File;
}
