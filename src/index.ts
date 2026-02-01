import { ApiExpress } from "@/infrastructure/api/express/api.express";
import { AccountModule } from "@/infrastructure/api/express/routes/account/Account.module";

const main = async () => {
  try {
    const accountModule = new AccountModule().register();

    const api = new ApiExpress([...accountModule]);
    api.start(Number(process.env.APPLICATION_PORT) || 3000);
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

main();
