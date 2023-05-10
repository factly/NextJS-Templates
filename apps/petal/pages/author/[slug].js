/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import PostGrid from 'apps/petal/components/PostGrid';
import gql from 'graphql-tag';
import { client } from 'apps/petal/store/client';

function UserDetailsFormat({ data }) {
  const { user, posts } = data;
  const name = user.display_name ? `${user.display_name}` : `${user.first_name} ${user.last_name}`;

  return (
    <>
      {/* <Seo title={name} /> */}
      <PostGrid type="author" posts={posts.nodes} item={{ ...user, name }} />;
    </>
  );
}

export default UserDetailsFormat;


export async function getServerSideProps({ params }) {
  const { data, error } = await client.query({
    query: gql`
      query ($slug: String!) {
        user(slug: $slug) {
          id
          first_name
          last_name
          email
          display_name
          slug
          social_media_urls
          description
          medium {
            url
            dimensions
          }
        }
        formats {
          nodes {
            id
            slug
            name
          }
        }
        posts(users: { slugs: [$slug] }) {
          nodes {
            users {
              id
              first_name
              last_name
              display_name
              slug
              medium{
                url
              }
            }
            categories {
              slug
              name
            }
            format {
              name
              slug
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
            excerpt
            slug
          }
          total
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
