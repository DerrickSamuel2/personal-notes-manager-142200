export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  token: string;
}
