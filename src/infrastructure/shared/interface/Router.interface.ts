import { HttpMethod } from "@/core/shared/types/HttpMethods.type";
import { Request, Response } from "express";

export interface Router {
  getHandler(): (request: Request, response: Response) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
}
