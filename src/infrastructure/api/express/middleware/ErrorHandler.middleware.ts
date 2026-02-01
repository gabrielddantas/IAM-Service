import { Response } from "express";
import { FieldsContentValidationException } from "@/core/shared/error/FieldsContentValidationException.error";
import { BusinessException } from "@/core/shared/error/BusinessException.error";
import { ErrorResponse } from "@/infrastructure/shared/model/ErrorResponse.model";
import { DateUtilities } from "@/core/shared/utils/DateUtilities.utils";
import { LoggerFactory } from "@/infrastructure/libs/logger/LoggerFactory.lib";
import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { HttpProtocols } from "@/core/shared/constants/HttpProtocols.constant";

export class ErrorHandlerMiddleware {
  public constructor() {}

  public handle(error: any, response: Response, path: string): void {
    const logger = LoggerFactory.createLogger(this.getOrigin(error));

    const errorResponse = this.buildErrorResponse(error, path);
    logger.error(errorResponse.message);

    response.status(errorResponse.status).json(errorResponse.toJSON());
  }

  private buildErrorResponse(error: any, path: string): ErrorResponse {
    if (error instanceof FieldsContentValidationException) {
      const fieldsError = error as FieldsContentValidationException;

      return ErrorResponse.builder({
        status: fieldsError.statusCode,
        message: fieldsError.message,
        fieldsErrors: fieldsError.getErrors(),
        details: fieldsError.details,
        timestamp: DateUtilities.getCurrentBrazilianTimestamp(),
        path,
      });
    }

    if (error instanceof BusinessException) {
      const businessError = error as BusinessException;

      return ErrorResponse.builder({
        status: businessError.statusCode,
        message: businessError.message,
        details: businessError.details,
        timestamp: DateUtilities.getCurrentBrazilianTimestamp(),
        path,
      });
    }

    console.log(error);
    return ErrorResponse.builder({
      status: HttpProtocols.HTTP_STATUS_RETURN.INTERNAL_SERVER_ERROR,
      message: "An unexpected error occurred, try again later.",
      details: ErrorDetails.builder({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      }),
      timestamp: DateUtilities.getCurrentBrazilianTimestamp(),
      path,
    });
  }

  private getOrigin(error: any): string {
    const UNKNOWN_ORIGIN = "Unknown Origin";
    const stack = error.stack as string;

    if (!error || !error.stack) {
      return UNKNOWN_ORIGIN;
    }

    const stackLines = stack.split("\n");
    return stackLines[1]?.trim().split(" ")[1] || UNKNOWN_ORIGIN;
  }
}
