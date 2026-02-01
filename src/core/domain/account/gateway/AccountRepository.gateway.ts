import { AccountEntity } from "../entity/Account.entity";

export interface AccountRepository {
  createAccount(accountData: AccountEntity): Promise<AccountEntity>;
  findByEmail(email: string): Promise<AccountEntity | null>;
  findLastAccount(): Promise<AccountEntity | null>;
}
