/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Head from 'next/head';
import gql from 'graphql-tag';
import { client } from '../store/client';

function CategoriesListPage({ data }) {
  return (
    <section>
      <Head>
        <title> Categories </title>
      </Head>
      <div sx={{ maxWidth: '1270px', mx: 'auto', fontSize: '32px', px: '32px', mb: '32px', textAlign: 'center' }}>
        <h1>
          Categories
        </h1>
      </div>
      <div sx={{ maxWidth: '1270px', mx: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(337px, 1fr))', gridGap: '32px', textAlign: 'center', px: '24px', mb: '48px', justifyContent: 'center' }}>
        {data.categories.nodes.map((category) => (
          <>
            <div sx={{}}>
              <a href={category.slug}> {category.medium}
                <img sx={{ borderRadius: '24px' }} src="https://source.unsplash.com/random/280x230" alt="" />
              </a>

              <a href={`/category/${category.slug}/`}>
                <p sx={{ mt: '24px', fontWeight: 700 }}> {category.name}</p>
              </a>
            </div>
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