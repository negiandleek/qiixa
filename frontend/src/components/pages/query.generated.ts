import * as Types from "../../generated/api-types.generated";

import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";

export type UserQueryVariables = {
  id?: Types.Scalars["ID"];
};

export type UserQuery = { __typename?: "Query" } & {
  user?: Types.Maybe<
    { __typename?: "User" } & Pick<
      Types.User,
      "id" | "name" | "profileImage" | "description"
    > & {
        articles: { __typename?: "ArticleConnection" } & {
          pageInfo?: Types.Maybe<
            { __typename?: "PageInfo" } & Pick<Types.PageInfo, "hasNextPage">
          >;
          edges: Array<
            Types.Maybe<
              { __typename?: "ArticleEdge" } & {
                node: { __typename?: "Article" } & Pick<
                  Types.Article,
                  "id" | "url" | "title"
                >;
              }
            >
          >;
        };
      }
  >;
};

export const UserDocument = gql`
  query User($id: ID! = "youya66") {
    user(id: $id) {
      id
      name
      profileImage
      description
      articles {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            url
            title
          }
        }
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
