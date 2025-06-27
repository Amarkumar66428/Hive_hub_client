// src/utils/encryption.js
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_API_BASE_URL;

export const encryptData = (data) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  return cipherText;
};

export const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
