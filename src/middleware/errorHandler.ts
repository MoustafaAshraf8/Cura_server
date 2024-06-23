import { NextFunction, Request, Response } from "express";
import { statusCode } from "../constant/StatusCode";
import { Exception_Interface } from "../type/Exception/Exception_Interface";

function errorHandler(
  exception: Exception_Interface,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(`global error handler: ${exception}`);
  res.statusCode =
    exception.statusCode || statusCode.serverError.internalServerError;
  res.json({
    name: exception.name,
    msg: exception.message,
    stack: exception.stack,
  });
}

export { errorHandler };
