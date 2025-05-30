import secureLocalStorage from "react-secure-storage";

export const STORAGE_KEYS = {
  token: "TOKEN",
  userData: "USER_DATA",
  rememberMe: false,
  credentials: "CREDENTIALS",
  prod_bot_id: "PROD_BOT_ID",
  tempToken: "TEMP_TOKEN",
  fcmToken: "FCM_TOKEN",
  environment: "test",
};

export function storeData(key, value) {
  secureLocalStorage.setItem(key, value);
}
export function getData(key) {
  return secureLocalStorage.getItem(key);
}
export function clearData() {
  secureLocalStorage.clear();
}

export function removeData(key) {
  secureLocalStorage.removeItem(key);
}