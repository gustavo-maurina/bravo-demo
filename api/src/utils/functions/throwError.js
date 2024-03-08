import { DEFAULT_ERROR_MESSAGE, DEFAULT_ERROR_STATUS_CODE } from "../constants/error.constants.js";

export function throwError({ message, statusCode }) {
  const err = Error();
  err.statusCode = statusCode ?? DEFAULT_ERROR_STATUS_CODE;
  err.status = message ?? DEFAULT_ERROR_MESSAGE;
  throw err;
}
