import { HttpProtocols } from "@/core/shared/constants/HttpProtocols.constant";
import { BusinessException } from "@/core/shared/error/BusinessException.error";
import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";

export class PasswordRequirementsExceptions extends BusinessException {
  public constructor(message: string) {
    super(
      message,
      HttpProtocols.HTTP_STATUS_RETURN.BAD_REQUEST,
      ErrorDetails.builder({
        code: "PASSWORD_REQUIREMENTS_NOT_MET",
        message: "The provided password does not meet the required criteria.",
      }),
    );
  }
}
