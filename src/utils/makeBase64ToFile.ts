export const makeBase64ToFileList = (
  pureBase64: string,
  fileName: string,
  mimeType = "image/jpeg"
): FileList => {
  const decodedData = atob(pureBase64);
  const byteArray = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; i++) {
    byteArray[i] = decodedData.charCodeAt(i);
  }

  const imageFile = new File([byteArray], fileName, { type: mimeType });

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(imageFile);

  return dataTransfer.files;
};
