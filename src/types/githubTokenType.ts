import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type GithubTokenInputType = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  githubBoolean: boolean;
  setGithubBoolean: Dispatch<SetStateAction<boolean>>;
  githubTokenOk?: string;
};
