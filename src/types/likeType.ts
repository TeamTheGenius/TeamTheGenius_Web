import { APIImage } from "./apiImageType";

export interface LikedChallengeDataType {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  fileResponse: APIImage;
  likesId: number;
}
