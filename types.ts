export interface IUser {
  name: string;
  email: string;
}

export interface IContext {
  user: IUser | null;
  setUser: React.Dispatch<IUser | null>;
  isInitialLoading: boolean;
}

export interface ILink {
  clickCount: number;
  fullLink: string;
  shortenedLink: string;
  _id: string
}