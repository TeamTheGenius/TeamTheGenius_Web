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
