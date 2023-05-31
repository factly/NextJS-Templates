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

import PostGrid from 'apps/tulip/components/PostGrid';
import gql from 'graphql-tag';
import { client } from 'apps/tulip/store/client';
import Head from 'next/head';

function UserDetailsAll({ data }) {
  const { dega } = data;
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
        mb: (theme) => `${theme.space.spacing5}`, px: (theme) => theme.space.layout2, display: 'grid',
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
        padding: '32px',
        ml: [null, null, '5rem', null]
      }}>
        <div>
          {item.medium ? (
            <img
              src={item.medium.url.proxy}
              alt=""
              sx={{
                borderRadius: '50%',
                width: '96px',
                height: '96px',
                mb: '1rem',
                padding: (theme) => `${theme.space.spacing8}`,
              }}
            />
          ) : (
            <div
              sx={{
                borderRadius: '50%',
                width: '96px',
                height: '96px',
                mb: '1rem',
                padding: (theme) => `${theme.space.spacing8}`,
                background: '#000',
              }}
            />
          )}

          <h1
            sx={{
              fontSize: (theme) => `${theme.fontSizes.h4}`,
              mb: (theme) => `${theme.space.spacing5}`,
              textTransform: 'capitalize',
            }}
          >
            {name}
          </h1>
          {item.description && (
            <p sx={{ pb: (theme) => `${theme.space.spacing5}` }}>{item.description}</p>
          )}

          <div sx={{ display: 'flex' }}>
            {item.social_media_urls &&
              Object.keys(item.social_media_urls).map((name) => (
                <a
                  key={name}
                  title={name}
                  href={item.social_media_urls[name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: (theme) => `${theme.space.spacing3}` }}
                >
                  {getIcon(name)}
                </a>
              ))}
            <a href={`mailto:${item.email}`} title="email">
              {getIcon('email')}
            </a>
          </div>
        </div>
      </div>

    );
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
