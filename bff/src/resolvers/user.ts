import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from "./";

export const userResovler: Resolvers<ContextType> = {
  Query: {
    user: (_: any, { id }, { dataSources }) => dataSources.user.getUserById(id),
  },
};
