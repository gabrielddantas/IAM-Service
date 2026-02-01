import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { BusinessException } from "./BusinessException.error";

export class NotFoundException extends BusinessException {
  public constructor(message: string, details: ErrorDetails) {
    super(message, 404, details);
  }
}
