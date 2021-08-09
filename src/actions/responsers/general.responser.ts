export default class GeneralResponser {
  static successResponse(data?: any) {
    return { success: true, data }
  }
}