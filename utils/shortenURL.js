const urlPath = "./public/jsons/urls.json";
const urls = require("./../public/jsons/urls.json");
const fs = require("fs");

// 字元表，由 0-9、a-z、A-Z 組成
const BASE_62_CHAR =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// 自字元表隨機產生字元
const getGarbledChar = (number) => {
  let result = "";

  for (let i = 0; i < number; i++) {
    result += BASE_62_CHAR[Math.floor(Math.random() * BASE_62_CHAR.length)];
  }

  return result;
};

module.exports = (inputURL) => {
  // 如果輸入網址的最後一個字元為斜線，則將其去除，避免使用短網址重新導回原網址時，可能出現錯誤
  if (inputURL[inputURL.length - 1] === "/") {
    inputURL = inputURL.slice(0, -1);
  }

  // 檢查網址是否已存在資料庫，若無，則產生新建立之GarbledText
  let condition = urls.some((url) => url.inputURL === inputURL);
  let garbledText = condition
    ? urls.find((url) => url.inputURL === inputURL).garbledText
    : getGarbledChar(5);

  if (!condition) {
    urls.push({
      garbledText,
      inputURL,
    });
    // 將更新的資料寫入 url.json
    fs.writeFile(urlPath, JSON.stringify(urls), (err) => {
      if (err) {
        console.log("Data written failed.");
        return console.error(err);
      }
      console.log("Data written successfully!");
    });
  }

  return `http://localhost:3000/${garbledText}`;
};
