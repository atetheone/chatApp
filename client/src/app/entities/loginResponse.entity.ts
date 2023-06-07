/*
Interface LoginResponse for http post request
*/
import { User } from ".";

export interface LoginResponse {
  token: string;
  user: User;
}