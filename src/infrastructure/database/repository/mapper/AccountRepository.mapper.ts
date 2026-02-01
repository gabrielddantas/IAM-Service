import { AccountEntity } from "@/core/domain/account/entity/Account.entity";
import { Account } from "@/infrastructure/database/prisma/generated/prisma/client";
import { AccountCreateInput } from "@/infrastructure/database/prisma/generated/prisma/models";

export class AccountRepositoryMapper {
  public static toDomain(accountModel: Account): AccountEntity {
    return AccountEntity.builder({
      id: accountModel.id,
      enrollment: accountModel.enrollment,
      name: accountModel.name,
      email: accountModel.email,
      active: accountModel.active,
      createdAt: accountModel.createdAt,
      updatedAt: accountModel.updatedAt || undefined,
      deletedAt: accountModel.deletedAt || undefined,
    });
  }

  public static toCreateModel(
    accountEntity: AccountEntity,
  ): AccountCreateInput {
    return {
      id: accountEntity.id,
      enrollment: accountEntity.enrollment,
      name: accountEntity.name!,
      email: accountEntity.email!,
      password: accountEntity.password!,
      active: accountEntity.active,
      createdAt: accountEntity.createdAt,
      updatedAt: accountEntity.updatedAt || undefined,
      deletedAt: accountEntity.deletedAt || undefined,
    };
  }
}
