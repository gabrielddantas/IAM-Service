import { AccountEntity } from "../entity/Account.entity";

export interface AccountRepository {
  createAccount(accountData: AccountEntity): Promise<void>;
  findByEnrollmentOrEmail(
    enrollment: bigint,
    email: string,
  ): Promise<AccountEntity | null>;
  findLastAccount(): Promise<AccountEntity | null>;
}
