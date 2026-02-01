import { Logger as ILogger } from "@/core/shared/gateway/Logger.gateway";
import { DateUtilities } from "@/core/shared/utils/DateUtilities.utils";
import { Logger, createLogger, format, transports } from "winston";

export class WinstonLogger implements ILogger {
  private logger: Logger;

  public constructor(context: string = "IAM-Service") {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({
          format: () => {
            return DateUtilities.getCurrentBrazilianTimestamp();
          },
        }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}] [${context}]: ${message}`;
        }),
        format.colorize({
          all: true,
          colors: {
            info: "white",
            error: "red",
            warn: "yellow",
          },
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  info(message: string, ...optionalParams: any[]): void {
    this.logger.info(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]): void {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]): void {
    this.logger.warn(message, ...optionalParams);
  }
}
