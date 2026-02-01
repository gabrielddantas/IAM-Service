import { ApiExpress } from "@/infrastructure/api/express/api.express";
import { AccountModule } from "@/infrastructure/api/express/routes/account/Account.module";

const main = async () => {
  const accountModule = new AccountModule().register();

  const api = new ApiExpress([...accountModule]);
  api.start(3000);
};

main();
