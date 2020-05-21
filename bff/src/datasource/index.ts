import { UserAPI } from "./user";
import { Article } from "./article";
import { Stock } from "./stock";

export function createDataSources() {
  return {
    user: new UserAPI(),
    article: new Article(),
    stock: new Stock(),
  };
}

export type DataSources = ReturnType<typeof createDataSources>;
