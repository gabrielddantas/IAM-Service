interface ErrorResponseProps {
  status: number;
  message: string;
  fieldsErrors?: Array<ErrorFieldDetailProps>;
  details: ErrorDetails;
  timestamp: string;
  path: string;
}

export class ErrorResponse {
  accessor status: number;
  accessor message: string;
  accessor fieldsErrors: Array<ErrorFieldDetail> | undefined;
  accessor details: ErrorDetails;
  accessor timestamp: string;
  accessor path: string;

  private constructor(
    status: number,
    message: string,
    fieldsErrors: Array<ErrorFieldDetailProps> | undefined,
    details: ErrorDetails,
    timestamp: string,
    path: string,
  ) {
    this.status = status;
    this.message = message;
    this.fieldsErrors = fieldsErrors?.map((fieldError) =>
      ErrorFieldDetail.builder(fieldError),
    );
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
      fieldsErrors: this.fieldsErrors?.map((fieldError) => fieldError.toJSON()),
      details: this.details.toJSON(),
      timestamp: this.timestamp,
      path: this.path,
    };
  }
}

interface ErrorFieldDetailProps {
  field: string;
  message: string;
}

class ErrorFieldDetail {
  accessor field: string;
  accessor message: string;

  private constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }

  public static builder(props: ErrorFieldDetailProps): ErrorFieldDetail {
    return new ErrorFieldDetail(props.field, props.message);
  }

  public toJSON() {
    return {
      field: this.field,
      message: this.message,
    };
  }
}

interface ErrorDetailsProps {
  code: string;
  message: string;
}

class ErrorDetails {
  accessor code: string;
  accessor message: string;

  private constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  public static builder(props: ErrorDetailsProps): ErrorDetails {
    return new ErrorDetails(props.code, props.message);
  }
  public toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
