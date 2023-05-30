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
  FaTwitter,
  FaTwitterSquare,
} from 'react-icons/fa';

import PostGrid from 'apps/lily/components/PostGrid';
import gql from 'graphql-tag';
import { client } from 'apps/lily/store/client';
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
      <div sx={{
        paddingLeft: '2rem',
        my: '3rem',
        maxWidth: '1200px'
      }}>
        <div sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '10rem',
          height: '10rem',
          background: 'black',
          borderRadius: '50%',
        }}>
          <img src={user.medium?.url?.proxy} alt="" />

        </div>
        <div sx={{
          fontWeight: 600,
          fontSize: '4.4rem',
          lineHeight: '28px',
          color: '#101828',
          mt: '20px'
        }}>
          <p>{user.display_name}</p>

        </div>

        <div sx={{
          display: 'flex',
          gap: '16px',
          mt: '20px',
          color: '#667085',
          alignItems: 'center'
        }}>
          <a
            title="Share on Linkedin"
            href={`https://www.linkedin.com/sharer.php?u=${encodeURIComponent(process.browser ? window.location.href : null)}}`}
            target="_blank"
            rel="noopener noreferrer">
            <FaLinkedin sx={{ color: '#979797', '&:hover': { color: '#000' } }} /></a>

          <a
            title="Share on Twitter"
            href={`https://www.twitter.com/share?url=${encodeURIComponent(process.browser ? window.location.href : null)}`}
            target="_blank"
            rel="noopener noreferrer">
            <FaTwitter sx={{ color: '#979797', '&:hover': { color: '#000' } }} /></a>
        </div>
      </div>
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
