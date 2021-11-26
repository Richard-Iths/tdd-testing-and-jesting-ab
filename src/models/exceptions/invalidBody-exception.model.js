import BaseException from "./base-exception.model.js";

export default class InvalidBodyException extends BaseException {
  constructor(message) {
    super(message, 400);
  }
}
