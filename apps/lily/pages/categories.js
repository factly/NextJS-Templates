/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'
import { jsx } from 'theme-ui';
import Layout from '../components/Layout';
import Link from 'next/link';
import { client } from '../store/client';
import gql from 'graphql-tag';
import Head from 'next/head';

const CategoriesListPage = ({ data }) => {
  console.log({ data })
  return (
    <section>
      <Head>
        <title> Categories </title>
      </Head>
      <div sx={{ maxWidth: '1400px', mx: 'auto', fontSize: '32px', px: '32px', textAlign: 'center' }}>
        <h1>Categories</h1>
      </div>
      <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))', gridGap: '32px', maxWidth: '1400px', mx: 'auto', mb: '48px', p: '32px' }}>
        {data.categories.nodes.map((category) => (
          <>
            {console.log({ category })}
            <Link sx={{ padding: '24px', fontWeight: 500, bg: '#eff8fa', borderRadius: '4px' }} href={`/category/${category.slug}/`}>
              {category.name}
            </Link>
          </>
        ))}
      </div>
    </section>
  )
}

export default CategoriesListPage

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
