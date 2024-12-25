import { APIImage } from "./apiImageType";

export interface MyProfileDataType {
  userId: number;
  identifier: string;
  nickname: string;
  information: string;
  point: number;
  progressBar: number;
  fileResponse: APIImage;
}

export interface UserDataType {
  identifier: string;
  nickname: string;
  fileResponse: APIImage;
  /*   fileResponse: {
    source: "none" | string;
  }; */
  frameId: number;
}

export interface MyAllChallengesStatisticsDataType {
  fail: number;
  success: number;
  processing: number;
  beforeStart: number;
}
