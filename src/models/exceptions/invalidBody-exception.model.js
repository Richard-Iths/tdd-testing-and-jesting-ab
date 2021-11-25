import BaseException from "./base-exception.model";

export default class InvalidBodyException extends BaseException {
  constructor(message) {
    super(message, 400);
  }
}
