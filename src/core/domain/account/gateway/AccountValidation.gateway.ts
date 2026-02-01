import { AccountEntity } from "@/core/domain/account/entity/Account.entity";
import { ErrorFieldsValidation } from "@/core/shared/model/ErrorFieldsValidation.model";

export interface AccountValidationGateway {
  isCreateAccountDataValid(data: AccountEntity): ErrorFieldsValidation;
}
