/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';

import PostGrid from 'components/PostGrid';

const TagDetailsFormat = ({ data }) => {
  const { posts, tag, formats } = data;

  return (
    <PostGrid
      type="tag"
      posts={posts.nodes}
      formats={formats.nodes}
      item={tag}
    />
  );
};

export default TagDetailsFormat;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($slug: String!) {
        tag(slug: $slug) {
          description
          id
          name
          slug
        }
        formats {
          nodes {
            id
            slug
            name
          }
        }
        posts(tags: { slugs: [$slug] }) {
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
      slug: params.slug,
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
}


















