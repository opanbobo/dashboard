import { keywordsCleansing } from "./CleansingKeywords";

export const keywordSet = (keyword, content) => {
  const clean = keywordsCleansing(keyword);

  let article = content;

  clean.forEach((keywordi) => {
    // const re = new RegExp(
    //   `('[^'\\\\]*(?:\\\\.[^'\\\\]*)*')|\\b${keywordi}\\b`,
    //   "gi"
    // );

    const re = new RegExp(`(?<![\\w\\d])${keywordi}(?![\\w\\d])`, "gi");

    article = article?.replace(re, `<b class="highlight-text">${keywordi}</b>`);
  });

  return article;
};

// const test = [
//   '""Kereta Cepat" "Jakarta""',
//   '"Kereta Cepat Jakarta Bandung"',
//   '"Kereta Cepat Jakarta Karawang"',
//   "KCJB",
// ]; /(?<![\w\d])KA(?![\w\d])/gi

// const content =
//   "Kereta Cepat Jakarta Karawang Kereta Cepat Jakarta Bandung KCJB";

// console.log(keywordSet(test, content));
