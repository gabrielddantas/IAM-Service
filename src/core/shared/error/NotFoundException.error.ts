import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { BusinessException } from "./BusinessException.error";
import { HttpProtocols } from "@/core/shared/constants/HttpProtocols.constant";

export class NotFoundException extends BusinessException {
  public constructor(message: string, details: ErrorDetails) {
    super(message, HttpProtocols.HTTP_STATUS_RETURN.NOT_FOUND, details);
  }
}
