import { IUserObj } from '../App';

interface IPictureList {
  pictureId: string;
  location: string;
  description: string;
  pictureURL: string;
  fileName: string;
}

interface SortByPram {
  pictureId: string;
  location: string;
  description: string;
  createdAt: string;
  hashtags: string[];
  likes: string[];
  comments: string[];
  creator: IUserObj;
  pictureList: IPictureList[];
}

export const sortByPopular = (next: SortByPram, prev: SortByPram): number => {
  return (
    prev.likes.length +
    prev.comments.length -
    (next.likes.length + next.comments.length)
  );
};

export const sortByLatest = (next: SortByPram, prev: SortByPram): number => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    parseInt(prevArr[0] + prevArr[1] + prevArr[2]) -
    parseInt(nextArr[0] + nextArr[1] + nextArr[2])
  );
};

export const sortByOldest = (next: SortByPram, prev: SortByPram): number => {
  const nextArr = next.createdAt.split('-');
  const prevArr = prev.createdAt.split('-');
  return (
    parseInt(nextArr[0] + nextArr[1] + nextArr[2]) -
    parseInt(prevArr[0] + prevArr[1] + prevArr[2])
  );
};
