class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof unAuthRequest) {
      return 401;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof internalServer) {
      return 500;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {} //400
class unAuthRequest extends GeneralError {} //401
class NotFound extends GeneralError {} //404
class internalServer extends GeneralError {} //500

export { GeneralError, BadRequest, unAuthRequest, NotFound, internalServer };
