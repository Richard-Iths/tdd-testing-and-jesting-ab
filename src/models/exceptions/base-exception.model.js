export default class BaseException extends Error {
  constructor(message, statusCode) {
    super(message);
    this._statusCode = statusCode;
  }
  get statusCode() {
    return this._statusCode;
  }
}
