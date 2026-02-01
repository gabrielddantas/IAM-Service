import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { BusinessException } from "./BusinessException.error";

export class UniqueConstraintException extends BusinessException {
  public constructor(message: string, details: ErrorDetails) {
    super(message, 409, details);
  }
}
