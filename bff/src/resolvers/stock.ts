import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from ".";

export const stockResolver: Resolvers<ContextType> = {
  Query: {
    async stocks(_: any, { id }, { dataSources }) {
      const stockCounts = await dataSources.stock.getStocksByArticleId(id);
      return {
        stockCounts,
      };
    },
  },
};
