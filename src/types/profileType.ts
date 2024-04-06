export interface MyProfileDataType {
  identifier: string;
  nickname: string;
  information: string;
  point: number;
  progressBar: number;
  fileResponse: {
    encodedFile: string;
  };
}

export interface UserDataType {
  identifier: string;
  nickname: string;
  fileResponse: {
    encodedFile: "none" | string;
  };
  frameId: number;
}

export interface MyAllChallengesStatisticsDataType {
  fail: number;
  success: number;
  processing: number;
  beforeStart: number;
}
