import { AccountEntity } from "@/core/domain/account/entity/Account.entity";
import { AccountRepository } from "@/core/domain/account/gateway/AccountRepository.gateway";
import { PrismaClient } from "@/infrastructure/database/prisma/generated/prisma/client";
import { AccountRepositoryMapper } from "@/infrastructure/database/repository/mapper/AccountRepository.mapper";

export class AccountRepositoryImpl implements AccountRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  async createAccount(accountData: AccountEntity): Promise<AccountEntity> {
    const createModel = AccountRepositoryMapper.toCreateModel(accountData);
    const result = await this.prisma.account.create({
      data: createModel,
    });

    return AccountRepositoryMapper.toDomain(result);
  }

  async findLastAccount(): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!account) {
      return null;
    }

    return AccountRepositoryMapper.toDomain(account);
  }

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.prisma.account.findFirst({
      where: {
        email,
      },
    });

    if (!account) {
      return null;
    }

    return AccountRepositoryMapper.toDomain(account);
  }
}
