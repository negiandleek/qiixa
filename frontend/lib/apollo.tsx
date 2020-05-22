
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next'
import React from 'react'

const link = createHttpLink({
  fetch,
  uri: "/graphql",
  credentials: 'same-origin'
});


export function withApollo(
  PageComponent: NextPage<any>,
) {
  const WithApollo: NextPage<any> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    const client = new ApolloClient({
      link: link,
      cache: new InMemoryCache().restore(apolloState),
      ssrMode: false
    });
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  return WithApollo
}