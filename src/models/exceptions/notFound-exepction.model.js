import BaseException from "./base-exception.model";

export default class NotFoundException extends BaseException {
  constructor(message) {
    super(message, 404);
  }
}
