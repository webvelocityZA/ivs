export interface UserAdmin{
    id?: number;
    firstName?: string;
    surname?: string;
    username?: string;
    password?: string;
    isAdmin?: boolean;
    token?: string;
    authenticated?: true;
    expires?: string;
  }