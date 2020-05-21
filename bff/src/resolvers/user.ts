import { Resolvers } from "../generated/graphql-resolver-types";
import { DataSources } from "../datasource";

interface ContextType {
  // token: string
  dataSources: DataSources;
}

export const userResovler: Resolvers<ContextType> = {
  Query: {
    user: (_: any, { id }, { dataSources }) => dataSources.user.getUserById(id),
  },
};
