export interface Post {
  title: string;
  body: string;
}
export interface User {
  name: string;
  email: string;
}
export interface UserDefault {
  user: User;
  posts: Post[];
  status: string;
  error: string | any;
}
