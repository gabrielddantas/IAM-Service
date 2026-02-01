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

  public static toResponse(
    accountEntity: AccountEntity,
  ): Record<string, unknown> {
    return {
      id: accountEntity.id?.toString(),
      enrollment: accountEntity.enrollment!.toString(),
      name: accountEntity.name,
      email: accountEntity.email,
      active: accountEntity.active,
      createdAt: accountEntity.createdAt,
      updatedAt: accountEntity.updatedAt,
      deletedAt: accountEntity.deletedAt,
    };
  }
}
