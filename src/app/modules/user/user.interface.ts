export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  bio?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  comparePassword?: (inputPassword: string) => Promise<boolean>;
};
