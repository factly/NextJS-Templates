/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
//import parseTiptapContent from '../../src/utils/parseTipTapEditorData';
import parseTiptapContent from 'apps/iris/src/helpers/parseTipTapEditorData';
import isBrowser from 'apps/iris/src/helpers/isBrowser';
import { client } from 'apps/iris/store/client';
import gql from 'graphql-tag';
import PostGrid from 'apps/iris/components/PostGrid';

const CategoryDetailsFormat = ({ data }) => {
  const { category, formats, posts } = data;

  const [readMore, setReadMore] = React.useState(true);
  const [isReadMoreNeeded, setIsReadMoreNeeded] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      const el = document.getElementById('category-description');
      setIsReadMoreNeeded(el?.clientHeight < el?.scrollHeight);
    }
  }, []);
  const header = (item) => {
    return (
      <div
        sx={{
          mb: (theme) => `${theme.space.spacing6}`,
          fontSize: (theme) => `${theme.fontSizes.h6}`,
        }}
      >
        <h1
          sx={{
            textAlign: 'center',
            fontSize: [(theme) => `${theme.fontSizes.h5}`, (theme) => `${theme.fontSizes.h4}`],
            mb: (theme) => `${theme.space.spacing5}`,
            textTransform: 'capitalize',
          }}
        >
          {item.name}
        </h1>
        <div
          id="category-description"
          sx={{
            maxHeight: (theme) => (readMore ? `calc(${theme.lineHeights.normal}em * 6 )` : '100%'),
            overflow: 'hidden',
            px: (theme) => `${theme.space.spacing5}`,
          }}
        >
          {process.browser && parseTiptapContent(item.description_html)}
        </div>
        {item.description && isReadMoreNeeded && (
          <button
            type="button"
            onClick={() => setReadMore((prev) => !prev)}
            sx={{
              px: (theme) => `${theme.space.spacing5}`,
              color: (theme) => `${theme.colors.textLinkPrimary}`,
              fontSize: (theme) => `${theme.fontSizes.h6}`,
            }}
          >
            {readMore ? 'Read more' : 'Read less'}
          </button>
        )}
      </div>
    );
  };
  return (
    <PostGrid
      type="category"
      posts={posts.nodes}
      formats={formats.nodes}
      item={category}
      header={header}
    />
  );
};

export default CategoryDetailsFormat;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($slug: String!) {
        category(slug: $slug) {
          description
          id
          medium {
            alt_text
            url
            dimensions
          }
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
        posts(categories: { slugs: [$slug] }) {
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
      slug: params.slug,
    },
  });

  if (!data || !data.category) {
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












