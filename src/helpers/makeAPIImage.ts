import { APIImage } from "@/types/apiImageType";
import { makeBase64URL } from "@/utils/makeBase64URL";

export const makeAPIImage = (file: APIImage) => {
  const { source, environment } = file;
  if (environment === "LOCAL") return makeBase64URL({ uri: source });
  else return source;
};
