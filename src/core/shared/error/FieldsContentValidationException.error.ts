import { HttpProtocols } from "@/core/shared/constants/HttpProtocols.constant";
import { BusinessException } from "@/core/shared/error/BusinessException.error";
import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { ErrorFieldsValidation } from "@/core/shared/model/ErrorFieldsValidation.model";

export class FieldsContentValidationException extends BusinessException {
  private errors: ErrorFieldsValidation;

  public constructor(errors: ErrorFieldsValidation) {
    super(
      "One or more fields have invalid content.",
      HttpProtocols.HTTP_STATUS_RETURN.BAD_REQUEST,
      ErrorDetails.builder({
        code: "FIELDS_CONTENT_VALIDATION_ERROR",
        message: "One or more fields have invalid content.",
      }),
    );

    this.errors = errors;
  }

  public getErrors(): ErrorFieldsValidation {
    return this.errors;
  }
}
