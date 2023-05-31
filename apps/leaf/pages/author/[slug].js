/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLink,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import PostGrid from 'apps/leaf/components/PostGrid';
import gql from 'graphql-tag';
import { client } from 'apps/leaf/store/client';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import Head from 'next/head';

function UserDetailsAll({ data }) {
  const { posts, user } = data;
  const getIcon = (name) => {
    switch (name) {
      case 'twitter':
        return <FaTwitterSquare color="#1da1f2" size="1.75rem" />;
      case 'facebook':
        return <FaFacebookSquare color="#3b5998" size="1.75rem" />;
      case 'instagram':
        return <FaInstagramSquare color="#e1306c" size="1.75rem" />;
      case 'linkedin':
        return <FaLinkedin size="1.75rem" color="#0077b5" />;
      case 'email':
        return <FaEnvelope size="1.75rem" color="#172b4d" />;
      default:
        return <FaLink size="1.75rem" />;
    }
  };

  const name = data.user.display_name
    ? `${data.user.display_name}`
    : `${data.user.first_name} ${data.user.last_name}`;

  const header = (item) => {
    return (
      <>
        <div sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: '4rem',
          alignItems: 'flex-start',
          Width: '350px',
          height: '350px',
          gap: '12px'
        }}>
          <div sx={{
            height: '80px',
            width: '80px',
            borderRadius: '50%',
            bg: 'black',

          }}>
            <img src="" alt="" />
          </div>
          <p sx={{
            fontSize: ' 2.1rem',
            fontWeight: 600,
            letterSpacing: '-.02em',
          }}>{user.display_name}</p>
          <div><p
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '28px',
            }}>{posts.total} posts </p>
          </div>
          <div sx={{
            display: 'flex',
            gap: '12px',

          }}>
            <a
              title="Tweet it"
              href={`https://twitter.com/share?url=${encodeURIComponent(process.browser ? window.location.href : null)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              title="Share on Facebook"
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(process.browser ? window.location.href : null)}}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </>
    )
  };
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <PostGrid
        type="author"
        posts={data.posts.nodes}
        formats={data.formats.nodes}
        item={data.user}
        header={header}
        useSlug={false}
      />
    </>
  );
}

export default UserDetailsAll;

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
