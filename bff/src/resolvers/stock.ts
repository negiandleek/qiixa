import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from ".";

export const stockResolver: Resolvers<ContextType> = {
  Query: {
    stocks(_: any, { id }, { dataSources }) {
      return dataSources.stock.getStocksByArticleId(id);
    },
  },
};
