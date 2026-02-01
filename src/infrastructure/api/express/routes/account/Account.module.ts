import { CreateAccountUseCase } from "@/core/domain/account/usecase/CreateAccount.usecase";
import { CreateAccountController } from "@/infrastructure/api/express/routes/account/post/CreateAccount/CreateAccount.controller";
import { Router } from "@/infrastructure/shared/interface/Router.interface";
import { AccountRepositoryImpl } from "@/infrastructure/database/repository/implementation/AccountRepository.impl";
import { prismaAdapter } from "@/infrastructure/libs/database/PrismaAdapter.lib";
import { HashManager } from "@/core/shared/gateway/HashManager.gateway";
import { AccountRepository } from "@/core/domain/account/gateway/AccountRepository.gateway";
import { AccountValidationGateway } from "@/core/domain/account/gateway/AccountValidation.gateway";
import { AccountValidationImpl } from "@/infrastructure/libs/validation/joi/AccountValidation.impl";
import { LoggerFactory } from "@/infrastructure/libs/logger/LoggerFactory.lib";
import { Argon2idAdapter } from "@/infrastructure/libs/cryptography/Argon2idAdapter.lib";

interface IUseCases {
  createAccount: CreateAccountUseCase;
}

export class AccountModule {
  private readonly accountRepository: AccountRepository;
  private readonly hashManager: HashManager;
  private readonly accountValidation: AccountValidationGateway;

  public constructor() {
    this.accountRepository = new AccountRepositoryImpl(prismaAdapter);
    this.hashManager = new Argon2idAdapter();
    this.accountValidation = new AccountValidationImpl();
  }

  public register(): Router[] {
    const bindUseCases = this.getInstancesUseCases();
    return this.getInstancesControllers(bindUseCases);
  }

  private getInstancesUseCases(): IUseCases {
    return {
      createAccount: new CreateAccountUseCase(
        this.accountRepository,
        LoggerFactory.createLogger(CreateAccountUseCase.name),
        this.hashManager,
        this.accountValidation,
      ),
    };
  }

  private getInstancesControllers(props: IUseCases): Router[] {
    return [
      new CreateAccountController(
        props.createAccount,
        LoggerFactory.createLogger(CreateAccountController.name),
      ),
    ];
  }
}
