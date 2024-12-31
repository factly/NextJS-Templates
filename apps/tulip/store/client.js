import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'isomorphic-unfetch';

export const client = new ApolloClient({
  uri: 'https://dega-api.factly.in/query',
  headers: {
    'X-Dega-API-Key':
      '$2a$10$43KHwQPMocCqGlfgBDt8/.VnaqTqofurW2l1wnZpNCfEp4rVJhf2m',
    'X-Space': parseInt(5),
  },
  cache: new InMemoryCache(),
});
