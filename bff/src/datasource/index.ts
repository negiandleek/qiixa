import { UserAPI } from "./user";

export function createDataSources() {
  return {
    user: new UserAPI(),
  };
}

export type DataSources = ReturnType<typeof createDataSources>;
