import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'isomorphic-unfetch';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const client = new ApolloClient({
  uri: 'https://stag-dega-api.factly.in/query',
  headers: {
    'X-Dega-API-Key': process.env.NX_PUBLIC_DEGA_API_KEY,
    'X-Space': parseInt(process.env.NX_PUBLIC_SPACE_ID)
  },
  cache: new InMemoryCache(),
});


