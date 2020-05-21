import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from "./";

export const articleResolver: Resolvers<ContextType> = {
  Query: {
    async articles(_: any, { id, first, after }, { dataSources }) {
      const { data, pageInfo } = await dataSources.article.getArticlesByUser(
        id,
        first,
        after
      );
      return {
        edges: data.map((item: any) => {
          return {
            node: item,
          };
        }),
        pageInfo: {
          hasNextPage: pageInfo.hasNext,
          hasPreviousPage: pageInfo.hasPrev,
        },
      };
    },
  },
  Article: {
    user(parent, _, { dataSources }) {
      return dataSources.user.enrichUser(parent.user);
    },
  },
};
