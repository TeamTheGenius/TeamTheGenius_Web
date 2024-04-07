export interface LikedChallengeDataType {
  instanceId: number;
  title: string;
  pointPerPerson: number;
  fileResponse: {
    encodedFile: string;
  };
  likesId: number;
}
