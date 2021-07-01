export const sortByPopular = (next, prev) => {
  return prev.likes.length - next.likes.length;
};
