export type Customer = {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export type CustomerJWT = {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: number;
};