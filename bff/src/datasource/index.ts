import { UserAPI } from "./user";
import { Article } from "./article";

export function createDataSources() {
  return {
    user: new UserAPI(),
    article: new Article(),
  };
}

export type DataSources = ReturnType<typeof createDataSources>;
