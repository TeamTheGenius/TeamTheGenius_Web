export interface MyProfileDataType {
  userId: number;
  identifier: string;
  nickname: string;
  information: string;
  point: number;
  progressBar: number;
  fileResponse: {
    source: string;
  };
}

export interface UserDataType {
  identifier: string;
  nickname: string;
  fileResponse: {
    source: "none" | string;
  };
  frameId: number;
}

export interface MyAllChallengesStatisticsDataType {
  fail: number;
  success: number;
  processing: number;
  beforeStart: number;
}
