/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import BlogCard from '../components/BlogCard';
import { client } from '../store/client';
import gql from "graphql-tag";

const Homepage = ({ data }) => {
  const { space, categories, factchecks, posts } = data;

  return <>
    <div
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        flex: '0 1 800px',
        justifyContent: 'center',
      }}
    >
      {/* featured post */}

      <div sx={{ pt: '1rem', flex: '1 0 auto' }}>
        <h2 sx={{ px: '2rem' }}>Featured Posts</h2>
        <BlogCard post={posts.nodes[0]} type="featured" />
      </div>

      {/* sidebar post */}

      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 500px',
          pt: '1rem',
        }}
      >

        <h2 sx={{ pb: '1.25rem', px: '1.5rem' }}>Factchecks</h2>
        {factchecks.nodes.slice(0, 5).map((factcheck) => {
          return <BlogCard post={factcheck} type="sidebar" key={factcheck.id} />;
        })}
      </div>
    </div>

    {/* bottom post */}

    <div>
      <h2 sx={{ px: '2rem' }}>Most Recent Posts</h2>
      <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {posts.nodes.map((post) => {
          return <BlogCard post={post} type="basic" key={post.id} />;
        })}
      </div>
    </div>
  </>
};

export default Homepage;

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: gql`
      query Homepage {
        featuredCategories(featuredCount: 4, postLimit: 20) {
          nodes {
            name
            posts {
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
                published_date
                id
                status
                subtitle
                title
                slug
                excerpt
              }
            }
          }
        }
        posts {
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
            published_date
            id
            status
            subtitle
            title
            slug
            excerpt
          }
        }
        factchecks: posts(formats: { slugs: ["fact-check"] }) {
          total
          nodes {
            users {
              id
              first_name
              last_name
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
            published_date
            id
            status
            subtitle
            title
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
