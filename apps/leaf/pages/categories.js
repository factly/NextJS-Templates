/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Head from 'next/head';
import { client } from '../store/client';
import gql from 'graphql-tag';
import Link from 'next/link';

function CategoriesListPage({ data }) {
  return (
    <section>
      <Head>
        <title> Categories </title>
      </Head>
      <div sx={{ maxWidth: '1400px', mx: 'auto', fontSize: '32px', px: '32px', mt: '24px', textAlign: 'center' }}>
        <h1>Categories</h1>
      </div>
      <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gridGap: '32px', maxWidth: '1400px', mx: 'auto', mb: '48px', p: '22px' }}>
        {data.categories.nodes.map((category) => (
          <>
            <Link sx={{ padding: '24px', fontWeight: 500, bg: '#eff8fa', borderRadius: '4px' }} to={`/category/${category.slug}/`}>
              {category.name}
            </Link>
          </>
        ))}
      </div>
    </section>
  );
}

export default CategoriesListPage;

export async function getServerSideProps() {
  const { data, error } = await client.query({
    query: gql`
      query  {
        categories {
          nodes {
            description
            description_html
            id
            medium {
              alt_text
              url
              dimensions
            }
            name
            slug
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}