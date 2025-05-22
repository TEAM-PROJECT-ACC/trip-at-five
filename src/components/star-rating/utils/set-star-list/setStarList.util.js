export const setStarList = ({ starCount }) => {
  const list = [];

  for (let i = 1; i <= starCount; i++) {
    list.push(i);
  }

  return list;
};
