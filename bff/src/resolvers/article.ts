import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from "./";

export const articleResolver: Resolvers<ContextType> = {
  Query: {
    async articles(_: any, { id, first, after }, { dataSources }) {
      const { data } = await dataSources.article.getArticlesByUser(
        id,
        first,
        after
      );
      return data;
    },
  },
};
