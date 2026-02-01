import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";

export class BusinessException extends Error {
  public readonly statusCode: number;
  public readonly details: ErrorDetails;

  public constructor(
    message: string,
    statusCode: number = 400,
    details: ErrorDetails,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
  }
}
