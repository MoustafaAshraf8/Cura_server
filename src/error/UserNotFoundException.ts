import { statusCode } from "../constant/StatusCode";
import { Exception_Interface } from "../type/Exception/Exception_Interface";
export class UserNotFoundException
  extends Error
  implements Exception_Interface
{
  message: string = "user not found";
  statusCode = statusCode.clientError.notFound;
  constructor() {
    super();
  }
}
