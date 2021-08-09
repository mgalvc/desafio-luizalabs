import GeneralResponser from "./general.responser";

export default class AuthResponser {
  static successResponse(token: string) {
    return GeneralResponser.successResponse({ token });
  } 
}