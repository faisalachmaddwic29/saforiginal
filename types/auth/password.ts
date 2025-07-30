import type { TypeAuthToken } from "./token";

type LoginPasswordRequest = {
  identifier: string,
  password: string
}


type LoginPasswordResponse = TypeAuthToken & {
  message: string;
  status: number | boolean;
};


export type { LoginPasswordRequest, LoginPasswordResponse }
