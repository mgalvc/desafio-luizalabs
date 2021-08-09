export default class GeneralResponse {
  static successResponse(data?: any) {
    return { success: true, data }
  }
}