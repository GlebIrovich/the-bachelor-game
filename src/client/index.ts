import { HttpLink, InMemoryCache, split } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { GRAPHQL_ENDPOINT, WS_GRAPHQL_ENDPOINT } from '../config';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const wsLink = new WebSocketLink({
  uri: WS_GRAPHQL_ENDPOINT,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});