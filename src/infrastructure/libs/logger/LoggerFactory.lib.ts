import { Logger } from "@/core/shared/gateway/Logger.gateway";
import { WinstonLogger } from "@/infrastructure/libs/logger/WinstonAdapter.lib";

export class LoggerFactory {
  public static createLogger(context: string): Logger {
    return new WinstonLogger(context);
  }
}
