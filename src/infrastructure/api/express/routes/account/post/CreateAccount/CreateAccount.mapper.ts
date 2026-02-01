import { AccountEntity } from "@/core/domain/account/entity/Account.entity";

interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateAccountMapper {
  public static toDomain(requestBody: CreateAccountRequest): AccountEntity {
    return AccountEntity.builder({
      name: requestBody.name,
      email: requestBody.email,
      password: requestBody.password,
    });
  }
}
