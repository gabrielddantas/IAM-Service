interface AccountEntityProps {
  id?: bigint;
  enrollment?: bigint;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class AccountEntity {
  accessor id: bigint | undefined;
  accessor enrollment: bigint | undefined;
  accessor name: string | undefined;
  accessor email: string | undefined;
  accessor password: string | undefined;
  accessor active: boolean = true;
  accessor createdAt: Date = new Date();
  accessor updatedAt: Date | undefined;
  accessor deletedAt: Date | undefined;

  private constructor(
    id: bigint | undefined,
    enrollment: bigint | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    active: boolean | undefined,
    createdAt: Date | undefined,
    updatedAt: Date | undefined,
    deletedAt: Date | undefined,
  ) {
    this.id = id;
    this.enrollment = enrollment;
    this.name = name;
    this.email = email;
    this.password = password;
    this.active = active ?? true;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static builder(props: AccountEntityProps): AccountEntity {
    return new AccountEntity(
      props.id,
      props.enrollment,
      props.name,
      props.email,
      props.password,
      props.active,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      enrollment: this.enrollment,
      name: this.name,
      email: this.email,
      password: this.password,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
