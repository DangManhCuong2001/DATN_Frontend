import BigNumber from "bignumber.js";

export default class CommonUtils {
  static getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export function BN(value: any): BigNumber {
  return new BigNumber(value);
}
