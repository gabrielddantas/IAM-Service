import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";
import { ErrorFieldsValidation } from "@/core/shared/model/ErrorFieldsValidation.model";

interface ErrorResponseProps {
  status: number;
  message: string;
  fieldsErrors?: ErrorFieldsValidation;
  details: ErrorDetails;
  timestamp: string;
  path: string;
}

export class ErrorResponse {
  accessor status: number;
  accessor message: string;
  accessor fieldsErrors: ErrorFieldsValidation | undefined;
  accessor details: ErrorDetails;
  accessor timestamp: string;
  accessor path: string;

  private constructor(
    status: number,
    message: string,
    fieldsErrors: ErrorFieldsValidation | undefined,
    details: ErrorDetails,
    timestamp: string,
    path: string,
  ) {
    this.status = status;
    this.message = message;
    this.fieldsErrors = fieldsErrors;
    this.details = details;
    this.timestamp = timestamp;
    this.path = path;
  }

  public static builder(props: ErrorResponseProps): ErrorResponse {
    return new ErrorResponse(
      props.status,
      props.message,
      props.fieldsErrors,
      props.details,
      props.timestamp,
      props.path,
    );
  }

  public toJSON() {
    return {
      status: this.status,
      message: this.message,
      fieldsErrors: this.fieldsErrors?.toJSON(),
      details: this.details.toJSON(),
      timestamp: this.timestamp,
      path: this.path,
    };
  }
}
