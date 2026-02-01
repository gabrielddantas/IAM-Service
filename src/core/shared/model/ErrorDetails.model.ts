interface ErrorDetailsProps {
  code: string;
  message: string;
}

export class ErrorDetails {
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
