export const makeFileToBase64Image = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        resolve(null);
      }
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽는데 실패했습니다"));
    };

    reader.readAsDataURL(file);
  });
};
