import { Logger } from "@/core/shared/gateway/Logger.gateway";
import { HashManager } from "@/core/shared/gateway/HashManager.gateway";
import { PasswordRequirementsExceptions } from "@/core/domain/account/error/PasswordRequirementsExceptions.error";
import { PASSWORD_REQUIREMENTS } from "@/core/shared/constants/PasswordRequirements.constant";
import { AccountEntity } from "@/core/domain/account/entity/Account.entity";
import { AccountRepository } from "@/core/domain/account/gateway/AccountRepository.gateway";
import { UniqueConstraintException } from "@/core/shared/error/UniqueConstraintException.error";
import { UseCase } from "@/core/shared/interface/UseCase.interface";
import { AccountValidationGateway } from "@/core/domain/account/gateway/AccountValidation.gateway";
import { FieldsContentValidationException } from "@/core/shared/error/FieldsContentValidationException.error";
import { ErrorDetails } from "@/core/shared/model/ErrorDetails.model";

export class CreateAccountUseCase implements UseCase<
  AccountEntity,
  AccountEntity
> {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly logger: Logger,
    private readonly hashManager: HashManager,
    private readonly accountValidation: AccountValidationGateway,
  ) {}

  public async execute(accountBody: AccountEntity): Promise<AccountEntity> {
    this.logger.info("Starting to create a new account");

    this.validateContentFields(accountBody);
    this.validatePasswordStrength(accountBody.password!);
    await this.validateUniqueDatabaseFields(accountBody);
    await this.hashPassword(accountBody);

    const createdAccount =
      await this.accountRepository.createAccount(accountBody);

    this.logger.info("New account created successfully");
    return createdAccount;
  }

  private async hashPassword(accountBody: AccountEntity): Promise<void> {
    this.logger.info("Hashing the account password");
    const hashedPassword = await this.hashManager.hash(accountBody.password!);
    accountBody.password = hashedPassword;
    this.logger.info("Account password hashed successfully");
  }

  private validateContentFields(accountData: AccountEntity): void {
    this.logger.info("Validating content fields for the new account");

    const validationErrors =
      this.accountValidation.isCreateAccountDataValid(accountData);

    if (validationErrors.hasErrors()) {
      throw new FieldsContentValidationException(validationErrors);
    }

    this.logger.info("Content fields validated successfully");
  }

  private async validateUniqueDatabaseFields(
    accountData: AccountEntity,
  ): Promise<void> {
    this.logger.info("Validating unique fields for the new account");

    const existingAccount = await this.accountRepository.findByEmail(
      accountData.email!,
    );

    if (existingAccount) {
      throw new UniqueConstraintException(
        "Account with the same email already exists",
        ErrorDetails.builder({
          code: "ACCOUNT_EMAIL_UNIQUE_CONSTRAINT_VIOLATION",
          message:
            "An account with the provided email already exists in the system.",
        }),
      );
    }

    this.logger.info("Unique fields validated successfully");
  }

  private validatePasswordStrength(password: string): void {
    this.logger.info("Validating password strength");

    if (password.length < PASSWORD_REQUIREMENTS.minLength.length) {
      throw new PasswordRequirementsExceptions(
        `Password must be at least ${PASSWORD_REQUIREMENTS.minLength.length} characters long`,
      );
    }

    const upperCaseMatches =
      password.match(PASSWORD_REQUIREMENTS.minUpperCase.regex) || [];
    if (upperCaseMatches.length < PASSWORD_REQUIREMENTS.minUpperCase.length) {
      throw new PasswordRequirementsExceptions(
        `Password must contain at least ${PASSWORD_REQUIREMENTS.minUpperCase.length} uppercase letter(s)`,
      );
    }

    const numberMatches =
      password.match(PASSWORD_REQUIREMENTS.minNumbers.regex) || [];
    if (numberMatches.length < PASSWORD_REQUIREMENTS.minNumbers.length) {
      throw new PasswordRequirementsExceptions(
        `Password must contain at least ${PASSWORD_REQUIREMENTS.minNumbers.length} number(s)`,
      );
    }

    const specialCharMatches =
      password.match(PASSWORD_REQUIREMENTS.minSpecialChars.regex) || [];
    if (
      specialCharMatches.length < PASSWORD_REQUIREMENTS.minSpecialChars.length
    ) {
      throw new PasswordRequirementsExceptions(
        `Password must contain at least ${PASSWORD_REQUIREMENTS.minSpecialChars.length} special character(s)`,
      );
    }

    this.logger.info("Password strength validated successfully");
  }
}
