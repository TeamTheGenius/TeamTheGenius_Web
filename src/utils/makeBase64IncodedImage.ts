interface Params {
  uri?: string;
  format: string;
}

export const makeBase64IncodedImage = ({ uri, format }: Params) => {
  return `data:image/${format};base64,${uri}`;
};
