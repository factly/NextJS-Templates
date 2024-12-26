import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'isomorphic-unfetch';

export const client = new ApolloClient({
  uri: process.env.NX_PUBLIC_DEGA_URL,
  headers: {
    'X-Dega-API-Key': process.env.NX_PUBLIC_DEGA_API_KEY,
    'X-Space': parseInt(process.env.NX_PUBLIC_DEGA_SPACE_ID, 10),
  },
  cache: new InMemoryCache(),
});
