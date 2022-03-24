import { GeneralError } from "../utils/error.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 0,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 0,
    message: err.message,
  });
};

export default errorHandler;
