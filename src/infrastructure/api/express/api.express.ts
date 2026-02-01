import { Router } from "@/infrastructure/shared/interface/Router.interface";
import { Api } from "@/infrastructure/shared/interface/API.interface";
import { ErrorHandlerMiddleware } from "@/infrastructure/api/express/middleware/ErrorHandler.middleware";
import express, { Express, NextFunction, Request, Response } from "express";

export class ApiExpress implements Api {
  private readonly BASE_PATH = "/iam-service/api";
  private app: Express;

  public constructor(routes: Router[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
    this.instantiateErrorHandlerMiddleware();
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.listRoutes();
    });
  }

  private instantiateErrorHandlerMiddleware() {
    this.app.use(
      (
        error: unknown,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        const errorHandler = new ErrorHandlerMiddleware();
        errorHandler.handle(error, response, request.path);
      },
    );
  }

  private addRoutes(routes: Router[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      // Wrap handler to catch async errors
      const wrappedHandler = (
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        Promise.resolve(handler(request, response)).catch(next);
      };

      this.app[method](this.BASE_PATH + path, wrappedHandler);
    });
  }

  private listRoutes() {
    // Força a inicialização do roteador caso ele ainda não tenha sido acessado
    const router = (this.app as any)._router || (this.app as any).router;

    if (!router || !router.stack) {
      console.log(
        "⚠️ O roteador do Express ainda não possui rotas registradas.",
      );
      return;
    }

    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => {
        const methods = Object.keys(layer.route.methods)
          .map((m) => m.toUpperCase())
          .join(", ");

        return {
          Method: methods,
          Path: layer.route.path,
        };
      });

    if (routes.length === 0) {
      console.log("ℹ️ Nenhuma rota encontrada no stack do Express.");
    } else {
      console.table(routes);
    }
  }
}
