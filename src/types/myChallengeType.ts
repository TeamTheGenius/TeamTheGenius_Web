export interface MyChallengeThumbnailDataType {
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
