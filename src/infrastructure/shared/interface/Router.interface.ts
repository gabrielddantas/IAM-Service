import { Request, Response } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface Router {
  getHandler(): (request: Request, response: Response) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
}
