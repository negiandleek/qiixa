import { Resolvers } from "../generated/graphql-resolver-types";
import { ContextType } from "./";

export const userResovler: Resolvers<ContextType> = {
  Query: {
    user(_: any, { id }, { dataSources }) {
      return dataSources.user.getUserById(id);
    },
  },
  User: {
    async articles(parent, { first, after }, { dataSources }) {
      const { data, pageInfo } = await dataSources.article.getArticlesByUser(
        parent.id,
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
};
