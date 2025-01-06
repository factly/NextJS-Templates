/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import { client } from 'apps/iris/store/client';
import StoryCard from 'apps/iris/components/StoryCard';
import gql from 'graphql-tag';
import { useSearchParams } from 'next/navigation';

const FormatDetails = ({ data }) => {
  const { posts } = data;
  const searchParams = useSearchParams();
  //const filteredPosts = allDegaPost.nodes.filter((post) => post.published_date !== null);
  return (
    <div sx={{ mx: 'auto', maxWidth: 1560 }}>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pb: (theme) => `${theme.space.spacing6}`,
          pt: [null, null, null, (theme) => `${theme.space.spacing7}`],
        }}
      >
        {posts.nodes.length > 0 ? (
          <div className="container">
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
                  <span sx={{ fontWeight: 400 }}>({posts.total || 0})</span>
                </h1>
              </div>
            )}
            <div className="row js-post-list-wrap post-list-wrap">
              {posts.nodes.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 js-post-card-wrap most-recent"
                  key={item.id}
                >
                  <StoryCard post={item} key={index} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h2 sx={{ textAlign: 'center' }}>No posts found</h2>
        )}
      </div>
    </div>
  );
};

export default FormatDetails;

export async function getServerSideProps({ params }) {
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

  // console.log({ ...data });

  return {
    props: {
      data,
    },
  };
}
