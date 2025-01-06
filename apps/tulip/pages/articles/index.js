/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import gql from 'graphql-tag';
import StoryCard from 'apps/tulip/components/StoryCard';
import { client } from 'apps/tulip/store/client';
import { jsx } from 'theme-ui';
import { useSearchParams } from 'next/navigation';

function FormatPage({ data }) {
  const searchParams = useSearchParams();
  const filteredPosts =
    data?.posts?.nodes?.filter((post) => post.published_date !== null) || [];

  return (
    <>
      <div sx={{ mx: 'auto', maxWidth: 1560 }}>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            pb: (theme) => `${theme.space.spacing6}`,
            pt: [null, null, null, (theme) => `${theme.space.spacing7}`],
          }}
        >
          {searchParams.get('query') && (
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div
                sx={{
                  width: '4px',
                  height: '40px',
                  backgroundColor: 'primary',
                }}
              />
              <h1
                sx={{
                  fontSize: '24px',
                  margin: '0',
                  color: 'text',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <span sx={{ fontWeight: 500 }}>Search Results:</span>
                <span sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  {searchParams.get('query')}
                </span>
                <span sx={{ fontWeight: 400 }}>({data.posts.total || 0})</span>
              </h1>
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
                <StoryCard storyData={item} key={index} />
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
      throw new Error('Error');
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
