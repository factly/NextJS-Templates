/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import gql from 'graphql-tag';
import StoryCard from 'apps/petal/components/StoryCard';
import { client } from 'apps/petal/store/client';
import { jsx } from 'theme-ui';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';

function FormatPage({ data }) {
  const searchParams = useSearchParams();
  const filteredPosts = data.posts.nodes.filter(
    (post) => post.published_date !== null
  );

  return (
    <>
      <Head>
        <title> {filteredPosts[0]?.format.name} </title>
      </Head>
      <div sx={{ mx: 'auto', maxWidth: 1560 }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pb: (theme) => `${theme.space.spacing6}`,
            pt: [null, null, null, (theme) => `${theme.space.spacing2}`],
          }}
        >
          {searchParams.get('query') && (
            <div
              style={{
                display: 'inline-block',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#4a5568',
                backgroundColor: '#edf2f7',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span style={{ fontWeight: 500, marginRight: '4px' }}>
                Search query:
              </span>
              <span
                style={{
                  color: '#2d3748',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  margin: '0 4px',
                }}
              >
                {searchParams.get('query')}
              </span>
              (
              <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
                {data.posts.total || 0}
              </span>{' '}
              results)
            </div>
          )}
          {filteredPosts.length > 0 ? (
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: [
                  '1fr',
                  null,
                  'repeat( 2, 1fr )',
                  'repeat( 3, 1fr)',
                ],
                px: [null, null, (theme) => `${theme.space.spacing6}`],
                mt: (theme) => `${theme.space.spacing7}`,
                gridGap: (theme) => `${theme.space.spacing7}`,
              }}
            >
              {filteredPosts.map((item, index) => (
                <StoryCard post={item} key={index} />
              ))}
            </div>
          ) : (
            <h2 sx={{ textAlign: 'center' }}>No posts found</h2>
          )}
        </div>
      </div>
    </>
  );
}
export default FormatPage;

export async function getServerSideProps({ params }) {
  try {
    const { data } = await client.query({
      query: gql`
        query ($slug: [String!]) {
          posts(formats: { slugs: $slug }) {
            total
            nodes {
              users {
                id
                first_name
                last_name
                display_name
                slug
              }
              categories {
                slug
                name
              }
              medium {
                alt_text
                url
                dimensions
              }
              format {
                name
                slug
              }
              published_date
              id
              excerpt
              status
              subtitle
              title
              slug
            }
          }
        }
      `,
      variables: {
        slug: ['fact-check', 'article'],
      },
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
  } catch (error) {
    return {
      props: {
        data: { posts: { nodes: [], total: 0 } },
      },
    };
  }
}
