/**
 * SignupResponse interface for http post request
 */

import { User } from ".";

export interface SignupResponse {
  status: number;
  success: boolean;
  user: User;
}