export interface User {
  uid: string;
  email: string;
  fullName: string;
  password?: string;
  emailVerified: boolean;
}
