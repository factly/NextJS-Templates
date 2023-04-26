/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Head from 'next/head';
import Link from 'next/link';
import { client } from '../store/client';
import gql from 'graphql-tag';

function CategoriesListPage({ data }) {
  return (
    <section>
      <Head>
        <title> Categories </title>
      </Head>
      <div sx={{ maxWidth: '1400px', mx: 'auto', fontSize: '32px', px: '32px', textAlign: 'center' }}>
        <h1>Categories</h1>
      </div>
      <div sx={{ maxWidth: '1400px', mx: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gridGap: '32px', p: '32px' }}>
        {data.categories.nodes.map((category) => (
          <div sx={{ display: 'flex', flexDirection: 'column', gap: '24px', bg: '#D6BBFB', p: '48px', textAlign: 'center', borderRadius: '8px' }}>
            <Link sx={{ display: 'flex', justifyContent: 'center' }} href={category.slug}>
              <img sx={{ width: '96px', height: '96px', bg: '#000', borderRadius: '50%', objectFit: 'cover', maxWidth: "100%" }} src="https://source.unsplash.com/random" alt="" />
            </Link>
            <Link sx={{ fontWeight: 700 }} href={`/category/${category.slug}/`}>
              {category.name}
            </Link>
            <p sx={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
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