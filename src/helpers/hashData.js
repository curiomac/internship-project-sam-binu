import CryptoJS from "crypto-js";
const hashData = () => {
  const set = (storageKey, data = "") => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.REACT_APP_CRYPTO_SECRET
    ).toString();
    localStorage.setItem(storageKey, encryptedData);
    return {
      encryptedData,
      decryptedData: data,
    };
  };
  const get = (storageKey) => {
    if (
      localStorage.getItem(storageKey) === null ||
      localStorage.getItem(storageKey) === undefined ||
      localStorage.getItem(storageKey) === "null" ||
      localStorage.getItem(storageKey) === "undefined"
    ) {
      return {
        decryptedData: [],
      };
    }
    const encryptedDataFromStorage = localStorage.getItem(storageKey) || [];
    const bytes = CryptoJS.AES.decrypt(
      encryptedDataFromStorage,
      process.env.REACT_APP_CRYPTO_SECRET
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return {
      encryptedData: encryptedDataFromStorage,
      decryptedData,
    };
  };

  return {
    set,
    get,
  };
};

export { hashData };
