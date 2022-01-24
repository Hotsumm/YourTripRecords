interface SortByPram {
  (next: IPost, prev: IPost): number;
}

export const sortByPopular: SortByPram = (next, prev) => {
  return (
    prev.likes.length +
    prev.comments.length -
    (next.likes.length + next.comments.length)
  );
};

export const sortByLatest: SortByPram = (next, prev) => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    parseInt(prevArr[0] + prevArr[1] + prevArr[2]) -
    parseInt(nextArr[0] + nextArr[1] + nextArr[2])
  );
};

export const sortByOldest: SortByPram = (next, prev) => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    parseInt(nextArr[0] + nextArr[1] + nextArr[2]) -
    parseInt(prevArr[0] + prevArr[1] + prevArr[2])
  );
};
