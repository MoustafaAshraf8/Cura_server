import { statusCode } from "../constant/StatusCode";
import { Exception_Interface } from "../type/Exception/Exception_Interface";
export class ForbiddenAccessException
  extends Error
  implements Exception_Interface
{
  message: string = "forbidden access";
  statusCode = statusCode.clientError.forbidden;
}
