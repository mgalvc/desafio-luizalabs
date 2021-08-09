import GeneralResponse from "./general.response";

export default class AuthResponse {
  static successResponse(token: string) {
    return GeneralResponse.successResponse({ token });
  } 
}