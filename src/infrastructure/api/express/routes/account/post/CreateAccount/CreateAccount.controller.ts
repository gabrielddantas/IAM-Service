import { CreateAccountUseCase } from "@/core/domain/account/usecase/CreateAccount.usecase";
import { Logger } from "@/core/shared/gateway/Logger.gateway";
import { AccountRouter } from "@/infrastructure/api/express/routes/account/AccountRouter.interface";
import { CreateAccountMapper } from "@/infrastructure/api/express/routes/account/post/CreateAccount/CreateAccount.mapper";
import { Request, Response } from "express";

export class CreateAccountController extends AccountRouter {
  public constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly logger: Logger,
  ) {
    super("post");
  }

  async execute(request: Request, response: Response): Promise<void> {
    this.logger.info("Received request to create account");

    const requestBodyEntity = CreateAccountMapper.toDomain({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });

    await this.createAccountUseCase.execute(requestBodyEntity);

    this.logger.info("Account created successfully");
    response.status(201).send();
  }
}
