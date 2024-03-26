import CryptoJS from "crypto-js";

// const secretKey = process.env.REACT_APP_AES_SECRETKEY;
const secretKey = "00000";

//암호화
export const encrypt = (item: any) => {
  let text = item.toString();

  const data = {
    id: text,
  };

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey);

  let result = encrypted.toString();

  return encodeURIComponent(result);
};

export const decrypt = (encrypted: any) => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encrypted),
    secretKey
  );
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedText) {
    return null;
  }

  const jsonId = JSON.parse(decryptedText);
  const idValue = jsonId.id;

  return idValue;
};
