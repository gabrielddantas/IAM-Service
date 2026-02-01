import {
  Router,
  HttpMethod,
} from "@/infrastructure/shared/interface/Router.interface";
import { Request, Response } from "express";

export abstract class AccountRouter implements Router {
  private readonly BASE_PATH = "/accounts";
  private path: string;
  private method: HttpMethod;

  public constructor(
    method: HttpMethod,
    version: string = "v1",
    path: string = "",
  ) {
    if (path === null) {
      path = "";
    }

    this.path = `/${version}${this.BASE_PATH}${path}`;
    this.method = method;
  }

  abstract execute(request: Request, response: Response): Promise<void>;

  getHandler(): (request: Request, response: Response) => Promise<void> {
    return this.execute.bind(this);
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }
}
