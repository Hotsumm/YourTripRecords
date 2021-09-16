export const sortByPopular = (next, prev) => {
  return (
    prev.likes.length +
    prev.comments.length -
    (next.likes.length + next.comments.length)
  );
};

export const sortByLatest = (next, prev) => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    prevArr[0] +
    prevArr[1] +
    prevArr[2] -
    (nextArr[0] + nextArr[1] + nextArr[2])
  );
};

export const sortByOldest = (next, prev) => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    nextArr[0] +
    nextArr[1] +
    nextArr[2] -
    (prevArr[0] + prevArr[1] + prevArr[2])
  );
};
