import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("Route Not Found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Route Not found" }];
  }
}

// throw new NotFoundError();
