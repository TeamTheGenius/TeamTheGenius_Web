import { Dispatch, SetStateAction } from "react";

export type adminTopicEditApiType = {
  topicTitle: string;
  topicDesc: string;
  topicNotice: string;
  topicTags: string;
  topicPoint: number;
  topicFile?: any;
  topicId?: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export type topicCreateApiType = {
  topicTitle: string;
  topicDesc: string;
  topicNotice: string;
  topicTags: string;
  topicPoint: string;
  topicFile: any;
};

export type adminTopicDataType = {
  title: string;
  topicId: number;
  fileResponse: {
    fileId: number;
    encodedFile: string;
  };
};
export type topicDeteilType = {
  topicId: number;
  title: string;
  tags: string;
  description: string;
  notice: string;
  pointPerPerson: number;
  fileResponse: {
    fileId: number;
    encodedFile: string;
  };
};
export type topicListType = {
  topicId: number;
  title: string;
  fileResponse: { fileId: number; encodedFile: string };
};
export type instanceListDataType = {
  topicId: number;
  instanceId: number;
  title: string;
  startedAt: string;
  completedAt: string;
  fileResponse: { fileId: number; encodedFile: string };
};
export type instanceDeteilType = {
  topicId: number;
  instanceId: number;
  title: string;
  tags: string;
  description: string;
  notice: string;
  pointPerPerson: number;
  startedAt: string;
  completedAt: string;
  fileResponse: {
    fileId: number;
    encodedFile: string;
  };
};
export type instanceCreateApiType = {
  instanceTitle: string;
  instanceDesc: string;
  instanceNotice: string;
  instanceCertMethod: string;
  instanceTags: string;
  instancePoint: number;
  instanceRangeStart: string;
  instanceRangeEnd: string;
  topicId: number;
  instanceImg: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export type fileType = {
  file?: { fileId?: number; encodedFile?: string };
};
export type fileDataType = {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  uid: string;
  webkitRelativePath?: string;
};
export type uploadDataType = {
  [index: number]: {
    uid: string;
    lastModified: number;
    name: string;
    originFileObj: fileDataType;
    percent: number;
    size: number;
    type: string;
  };
};
export type editInstacneQueryType = {
  topicIdId: number;
  instanceId: number;
  instanceDesc: string;
  instanceNotice: string;
  instancePoint: number;
  instanceCertificationMethod: string;
  instanceStartAt: string;
  instanceTitle: string;
  instanceCompletedAt: string;
  instanceImg?: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
