import { HttpProtocols } from "@/core/shared/constants/HttpProtocols.constant";

export type HttpMethod =
  (typeof HttpProtocols.HTTP_METHODS)[keyof typeof HttpProtocols.HTTP_METHODS];
