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
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import PostGrid from '../../components/PostGrid';
import gql from 'graphql-tag';
import { client } from '../../store/client';
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
  //const posts = data.total;

  const header = (item) => {
    // return (
    //   <div sx={{ mb: (theme) => `${theme.space.spacing5}`, px: (theme) => theme.space.layout2 }}>
    //     {item.medium && (
    //       <img
    //         src={item.medium?.url.proxy}
    //         alt=""
    //         sx={{
    //           borderRadius: '50%',
    //           width: 40,
    //           height: 40,
    //           mx: 'auto',
    //           padding: (theme) => `${theme.space.spacing8}`,
    //         }}
    //       />
    //     )}
    //     <h1
    //       sx={{
    //         fontSize: (theme) => `${theme.fontSizes.h4}`,
    //         mb: (theme) => `${theme.space.spacing5}`,
    //         textTransform: 'capitalize',
    //       }}
    //     >
    //       {name}
    //     </h1>
    //     {item.description && (
    //       <p sx={{ pb: (theme) => `${theme.space.spacing5}` }}>{item.description}</p>
    //     )}
    //     <div sx={{ display: 'flex' }}>
    //       {item.social_media_urls &&
    //         Object.keys(item.social_media_urls).map((name) => (
    //           <a
    //             key={name}
    //             title={name}
    //             href={item.social_media_urls[name]}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             sx={{ mr: (theme) => `${theme.space.spacing3}` }}
    //           >
    //             {getIcon(name)}
    //           </a>
    //         ))}
    //       <a href={`mailto:${item.email}`} title="email">
    //         {getIcon('email')}
    //       </a>
    //     </div>
    //   </div>
    // );
  };
  return (
    <>
      <div
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: (theme) => `${theme.space.spacing6}`,
          pb: (theme) => `${theme.space.spacing6}`,
          borderBottomWidth: '1px',
        }}
      >
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '42px',
          }}
        >
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              width: '200px',
              height: '200px',
              background: 'black',
              borderRadius: '200px',
            }}
          >
            <img src={user.medium?.url?.proxy} alt="" />
          </div>
          <div>
            <div>
              <p
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '42px',
                  lineHeight: '68px',
                }}
              >
                {user.display_name}
              </p>
            </div>
            <div>
              <p
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '28px',
                }}
              >
                {posts.total} posts{' '}
              </p>
            </div>
          </div>
        </div>
        <div
          sx={{
            display: 'flex',
          }}
        >
          <a
            title="Tweet it"
            href={`https://twitter.com/share?url=${encodeURIComponent(
              process.browser ? window.location.href : null
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              padding: '10px',
              gap: '0px',
              width: '40px',
              height: '40px',
              background: ' #FFFFFF',
              //border: '1px solid #D0D5DD',
              //boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              //borderRadius: '8px',
              display: 'block',
              m: (theme) => `${theme.space.spacing2}`,
              fontWeight: 'semibold',
              borderRadius: 'default',
            }}
          >
            <FaTwitter />
          </a>

          <a
            title="Share on Facebook"
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
              process.browser ? window.location.href : null
            )}}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              padding: '10px',
              gap: '0px',
              width: '40px',
              height: '40px',
              background: ' #FFFFFF',
              //border: '1px solid #D0D5DD',
              //boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              //borderRadius: '8px',
              display: 'block',
              m: (theme) => `${theme.space.spacing2}`,
              fontWeight: 'semibold',
              borderRadius: 'default',
            }}
          >
            <FaFacebook />
          </a>

          <a
            title="Share on WhatsApp"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              process.browser ? window.location.href : null
            )}}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              padding: '10px',
              gap: '0px',
              width: '40px',
              height: '40px',
              background: ' #FFFFFF',
              //border: '1px solid #D0D5DD',
              //boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              //borderRadius: '8px',
              display: 'block',
              m: (theme) => `${theme.space.spacing2}`,
              fontWeight: 'semibold',
              borderRadius: 'default',
            }}
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

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
              medium {
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
