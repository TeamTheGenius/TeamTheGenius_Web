export interface CertificationDataType {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED" | "PASSED";
  prCount: number;
  prLinks: string[];
}

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface CertificationInstnaceDetailDataType {
  instanceId: number;
  title: string;
  participantCount: number;
  pointPerPerson: number;
  certificationMethod: string;
  startDate: string;
  completedDate: string;
  fileResponse: File;
}

interface File {
  encodedFile: string;
}

export interface myWeekCertificationDataType {
  userId: number;
  certifications: CertificationDataType[];
}

export interface AllWeekCertificationDataType {
  userId: number;
  nickname: string;
  certifications: CertificationDataType[];
  frameId: number;
  profile: {
    encodedFile: string;
  };
}

export interface TotalCertificationDataType {
  totalAttempts: number;
  certifications: CertificationDataType[];
}

export interface CertificationStatisticsType {
  prTemplate: string;
  repository: string;
  successPercent: number;
  totalAttempt: number;
  currentAttempt: number;
  pointPerPerson: number;
  successCount: number;
  failureCount: number;
  remainCount: number;
}
