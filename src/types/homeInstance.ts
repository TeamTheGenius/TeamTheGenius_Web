export interface InstanceThumbnailDataType {
  instanceId: number;
  title: string;
  participantCnt: number;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
  likesId: number;
}
