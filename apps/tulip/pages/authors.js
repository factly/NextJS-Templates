/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import {
  FaEnvelope,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLink,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';
import gql from 'graphql-tag';
import { client } from '../store/client';

function AuthorsListPage({ data }) {
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

  return (
    <section>
      <Head>
        <title> Authors </title>
      </Head>
      <div sx={{ fontSize: '32px', px: '24px', maxWidth: '424px', mx: 'auto', mb: '24px' }}>
        <h1 sx={{ mt: '1rem' }}>
          Authors
        </h1>
      </div>
      <div sx={{ bg: '#eff8fa', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '424px', mx: 'auto', py: '60px', px: '48px', mb: '48px' }}>
        {data.users.nodes.map((author) => (
          <>
            <Link sx={{ display: 'flex', justifyContent: 'center' }} href={`/author/${author.slug}/`}>
              <img sx={{ width: '96px', height: '96px', bg: '#000', borderRadius: '50%', objectFit: 'cover', maxWidth: "100%" }} src="https://source.unsplash.com/random" alt="" />
            </Link>

            <Link href={`/author/${author.slug}/`} sx={{
              textAlign: 'center',
              fontWeight: 700,
              "&:hover": {
                textDecoration: "underline",
              }
            }}>{author.display_name}</Link>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
              {author.social_media_urls &&
                Object.keys(author.social_media_urls).map((name) => (
                  <Link
                    key={name}
                    title={name}
                    href={author.social_media_urls[name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mr: (theme) => `${theme.space.spacing3}` }}
                  >
                    {getIcon(name)}
                  </Link>
                ))}
              <Link href={`mailto:${author.email}`} title="email">
                {getIcon('email')}
              </Link>
            </div>
          </>
        ))}
      </div>
    </section>
  );
}
export default AuthorsListPage;

export async function getServerSideProps() {
  const { data, error } = await client.query({
    query: gql`
      query  {
        users{
          nodes {
            id
            first_name
            last_name
            email
            medium {
              url
              dimensions
            }
            social_media_urls
            description
            slug
            display_name
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
