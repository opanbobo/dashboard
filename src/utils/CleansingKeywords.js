const sortByLength = (arr) => {
  return arr.sort((x, y) => y.length - x.length);
};

export const keywordsCleansing = (keywords) => {
  const result = [];

  keywords?.forEach((keyword) => {
    keyword = keyword.replace('" "', "-split-");
    keyword = keyword.replace(/"+/g, "");
    keyword = keyword.split("-split-");

    keyword.forEach((keyword) => {
      result.push(keyword);
    });
  });

  const removeDuplicates = (arr) => {
    return [...new Set(arr)];
  };

  return sortByLength(removeDuplicates(result));
};
