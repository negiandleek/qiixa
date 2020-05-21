import { userResovler } from "./user";
import { DataSources } from "../datasource";
import { articleResolver } from "./article";
import { stockResolver } from "./stock";
export interface ContextType {
  // token: string
  dataSources: DataSources;
}

export const resolvers = [userResovler, articleResolver, stockResolver];
