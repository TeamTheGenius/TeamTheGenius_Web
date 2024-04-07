export interface ChallengeDetailDataType {
  instanceId: number;
  title: string;
  remainDays: number;
  startedDate: string;
  completedDate: string;
  participantCount: number;
  pointPerPerson: number;
  description: string;
  notice: string;
  certificationMethod: string;
  joinStatus: "NO" | "YES";
  likesInfo: Likes;
  fileResponse: File;
  progress: "PREACTIVITY" | "ACTIVITY" | "DONE";
}

interface Likes {
  likesId: number;
  isLiked: boolean;
  likesCount: number;
}

interface File {
  encodedFile: string;
}
