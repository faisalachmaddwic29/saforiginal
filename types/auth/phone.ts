import type { TypeAuthToken } from "./token";

type LoginPhoneRequest = {
  phone: string;
}

type LoginPhoneResponse = {
  is_registered: boolean
  message: string;
  status: number | boolean;
};


type LoginPhoneOtpRequest = {
  phone: string;
  otp: string
}

type LoginPhoneOtpResponse = TypeAuthToken & {
  message: string;
  status: number | boolean;
};


type RegisterPhoneOtpRequest = {
  otp: string;
  name: string;
  email: string;
  phone: string;
  location_id: string | number;
  gender: string; // diasumsikan L = Laki-laki, P = Perempuan
}

type RegisterPhoneOtpResponse = TypeAuthToken & {
  message: string;
  status: number | boolean;
};




export type { LoginPhoneRequest, LoginPhoneResponse, LoginPhoneOtpRequest, LoginPhoneOtpResponse, RegisterPhoneOtpRequest, RegisterPhoneOtpResponse }
