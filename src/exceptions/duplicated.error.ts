export default class DuplicatedError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DuplicatedError.prototype);
  }
}