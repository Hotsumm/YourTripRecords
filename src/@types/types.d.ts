// USER

interface IUserObj {
  userId: string;
  avatar: string;
  createdAt: string;
  email: string;
  intro?: string;
  isSocial: boolean;
  nickname: string;
  records: string[];
  instagram?: string;
}

interface IUserContext {
  userObj: IUserObj | null;
  refreshUser: (sign: boolean) => void;
}

// POST
interface IPost {
  postId: string;
  city: string;
  postTitle: string;
  season: string;
  createdAt: string;
  hashtags: string[];
  likes: string[];
  comments: string[];
  creator: { userObj: IUserObj };
  pictureList: IPictureList[];
}

interface IPictureList {
  pictureId: string;
  location: ILocation | null;
  description: string;
  pictureURL: string;
  fileName: string;
}

interface ILocation {
  coords: ICoords;
  locationId: string;
  placeName: string;
}

interface ICoords {
  latitude: string;
  longitude: string;
}

interface IComment {
  authorId: string;
  avatar: string;
  commentId: string;
  content: string;
  createdAt: string;
  nickname: string;
}

interface IPictureFileList {
  picturePreview: string;
  fileName: string;
  picture: string;
  location: ILocation | null;
  description: string;
}

interface ICityArray {
  id: number;
  name: string;
}

//Prams
interface LocationSelectParams {
  (
    locationId: string,
    longitude: string,
    latitude: string,
    place_name: string,
    id: number,
  ): void;
}
