import { APIImage } from "./apiImageType";

export interface InstanceThumbnailDataType {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: APIImage;
  likesId: number;
}
