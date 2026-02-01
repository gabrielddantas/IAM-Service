interface ErrorFieldItem {
  field: string;
  message: string;
}

export class ErrorFieldsValidation {
  private errors: ErrorFieldItem[] = [];

  private constructor(errors: ErrorFieldItem[] = []) {
    this.errors = errors;
  }

  public static create(): ErrorFieldsValidation {
    return new ErrorFieldsValidation();
  }

  public static fromArray(props: ErrorFieldItem[]): ErrorFieldsValidation {
    const instance = new ErrorFieldsValidation();
    props.forEach((prop) => instance.add(prop));
    return instance;
  }

  public add(props: ErrorFieldItem): ErrorFieldsValidation {
    this.errors.push({ field: props.field, message: props.message });
    return this;
  }

  public addAll(props: ErrorFieldItem[]): ErrorFieldsValidation {
    props.forEach((prop) => this.add(prop));
    return this;
  }

  public hasErrors(): boolean {
    return !this.isEmpty();
  }

  public isEmpty(): boolean {
    return this.errors.length === 0;
  }

  public count(): number {
    return this.errors.length;
  }

  public getErrors(): ErrorFieldItem[] {
    return [...this.errors];
  }

  public getByField(field: string): ErrorFieldItem | undefined {
    return this.errors.find((error) => error.field === field);
  }

  public getAllByField(field: string): ErrorFieldItem[] {
    return this.errors.filter((error) => error.field === field);
  }

  public clear(): ErrorFieldsValidation {
    this.errors = [];
    return this;
  }

  public toJSON(): ErrorFieldItem[] {
    return this.errors.map((error) => ({
      field: error.field,
      message: error.message,
    }));
  }
}
