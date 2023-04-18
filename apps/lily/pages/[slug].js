/** @jsx jsx */
/** @jsxRuntime classic */

import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { jsx } from 'theme-ui';
import { FaTwitterSquare, FaFacebookSquare, FaWhatsappSquare } from 'react-icons/fa';
import Post from '../components/Post';
import { client } from '../store/client';
import Head from 'next/head';
import parseDate from '../src/utils/parseDate';
import StoryCard from '../components/StoryCard';

export default function PostDetails({ post, posts, recentPosts }) {
  const filteredPosts = posts.nodes.filter((p) => p.id !== post.id).slice(0, 6);

  const [showSocialIcon, setShowSocialIcon] = React.useState(false);
  const [postActiveIndex, setPostActiveIndex] = React.useState(parseInt(post.id));
  const [observer, setObserver] = React.useState({
    observe: () => { },
  });

  const handleShowSocialIcon = (entry) => {
    if (entry.intersectionRatio > 0) {
      setShowSocialIcon(false);
    } else {
      setShowSocialIcon(true);
    }
  };

  const handleSetActiveLink = (entry) => {
    const id = entry.target.getAttribute('slug');
    if (entry.intersectionRatio > 0) {
      setPostActiveIndex(id);
    }
  };

  const createObserver = () => {
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.hasAttribute('social-icon')) {
          handleShowSocialIcon(entry);
        }
        if (entry.target.hasAttribute('post')) {
          handleSetActiveLink(entry);
        }
      });
    });
    setObserver(o);
  };
  React.useEffect(() => {
    createObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // for sharing links
  const title = encodeURIComponent(post.title);
  let url;
  if (process.browser) {
    url = encodeURIComponent(window.location.href);
  }
  return (
    <>
      <Head>
        <title> {post.title} </title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.medium && <meta property="og:image" content={post.medium?.url.proxy} />}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        {post.schemas &&
          post.schemas.map((schema, i) => (
            <script
              key={i}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            ></script>
          ))}
      </Head>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 1024,
            mx: 'auto',
            p: [
              (theme) => `${theme.space.spacing3}`,
              null,
              null,
              (theme) => `${theme.space.spacing8}`,
            ],
            pl: (theme) => [null, null, `${theme.space.spacing8}`],
          }}
        >
          <Post post={post} observer={observer} />

          {showSocialIcon && !post.is_page && (
            <>
              <div
                className="top-auto"
                style={{
                  top: '40vh',
                }}
                sx={{
                  display: ['none', null, 'flex'],
                  flexDirection: 'column',
                  position: 'fixed',
                  ml: (theme) => `-${theme.space.spacing8}`,
                  // left: 0,
                  alignItems: 'center',
                  justifyContent: ['flex-start', null, 'flex-end'],
                  top: '40vh',
                }}
              >
                <a
                  title="Share on Facebook"
                  href={`https://www.facebook.com/sharer.php?u=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    mx: (theme) => `${theme.space.spacing3}`,
                    '&:first-of-type': { mx: 0 },
                    my: (theme) => `${theme.space.spacing2}`,
                    fontWeight: 'semibold',
                    borderRadius: 'default',
                  }}
                >
                  <FaFacebookSquare
                    sx={{ fontSize: (theme) => `${theme.fontSizes.h4}` }}
                    color="#3b5998"
                  />
                </a>
                <a
                  title="Tweet it"
                  href={`https://twitter.com/share?text=${title}-&url=${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    mx: (theme) => `${theme.space.spacing3}`,
                    '&:first-of-type': { mx: 0 },
                    my: (theme) => `${theme.space.spacing2}`,
                    fontWeight: 'semibold',
                    borderRadius: 'default',
                  }}
                >
                  <FaTwitterSquare
                    sx={{ fontSize: (theme) => `${theme.fontSizes.h4}` }}
                    color="#1da1f2"
                  />
                </a>
                <a
                  title="Share on WhatsApp"
                  href={`https://api.whatsapp.com/send?text=${title}-${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    mx: (theme) => `${theme.space.spacing3}`,
                    '&:first-of-type': { mx: 0 },
                    my: (theme) => `${theme.space.spacing2}`,
                    fontWeight: 'semibold',
                    borderRadius: 'default',
                  }}
                >
                  <FaWhatsappSquare
                    sx={{ fontSize: (theme) => `${theme.fontSizes.h4}` }}
                    color="#25d366"
                  />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div>
        <div sx={{
          display: 'flex',
          width: '944px',
          ml: '4rem',
          mb: '12px'
        }}>
          {recentPosts.nodes
            .filter((p) => p.id !== post.id)
            .splice(0, 3)
            .map((post) => (
              <div
                key={post.id}
                sx={{
                  flex: [null, null, '0 0 50%'],
                  maxWidth: [null, null, '50%'],
                  p: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <Link passHref href={`/${post.slug}`} sx={{ display: 'flex' }}>
                  <a>
                    <div>
                      <img src={post.medium.url.proxy} alt="" />
                    </div>
                    <div sx={{
                      display: 'flex',
                      gap: '4px'
                    }}>
                      <p sx={{
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#F55353',
                      }}>{post.users[0].display_name} .</p>
                      <div >
                        <p sx={{
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#F55353',
                          mb: '8px'
                        }}>{parseDate(post.published_date)}</p>
                      </div>
                    </div>
                    <h5 sx={{
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '32px',
                      color: '#101828'
                    }}>{post.title}</h5>


                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div> */}

      <div sx={{
        display: 'flex',
        mb: '16px'
      }}>
        {recentPosts.nodes
          .filter((p) => p.id !== post.id)
          .splice(0, 3)
          .map((post) => (
            <div
              key={post.id}
              sx={{
                flex: [null, null, '1 0 33%'],
                maxWidth: [null, null, '33%'],
                p: '1.5rem',
                textAlign: 'left',
              }}
            >
              <Link href={`/${post.slug}`} sx={{ display: 'flex' }}>

                <div sx={{ flex: '0 0 33%' }}>
                  <img src={post.medium.url.proxy} alt="" />
                </div>

              </Link>
              <div sx={{
                display: 'flex',
                alignItems: 'center',
                mb: '12px'
              }}>
                <Link href={`/author/${post.users[0].slug}`}>

                  <p sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#F55353',
                    ml: '16px',
                  }}>{post.users[0].display_name} .</p>

                </Link>
                <div><p sx={{
                  fontSize: '0.75rem', color: '#F55353', fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>{parseDate(post.published_date)}</p></div>
              </div>
              <div sx={{ flex: '0 0 67%', pl: '1rem' }}>
                <h5>{post.title}</h5>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query PostQuery($slug: String) {
        post(slug: $slug, include_pages: true) {
          published_date
          is_page
          description
          description_html
          excerpt
          id
          schemas
          slug
          status
          subtitle
          title
          updated_at
          users {
            email
            first_name
            last_name
            display_name
            slug
            id
          }
          tags {
            id
            name
            slug
            description
          }
          medium {
            alt_text
            id
            url
            dimensions
          }
          format {
            name
            slug
            id
            description
          }
          claims {
            checked_date
            claim_date
            claim_sources
            claimant {
              description
              id
              name
              slug
              tag_line
            }
            description
            id
            fact
            review_sources
            slug
            claim
            rating {
              description
              id
              name
              numeric_value
              slug
              medium {
                alt_text
                id
                url
                dimensions
              }
            }
          }
          categories {
            description
            created_at
            id
            name
            slug
            medium {
              alt_text
              id
              url
              dimensions
            }
          }
        }
        posts {
          nodes {
            published_date
            description
            excerpt
            id
            slug
            status
            subtitle
            title
            updated_at
            users {
              email
              first_name
              last_name
              display_name
              slug
              id
            }
            tags {
              id
              name
              slug
              description
            }
            medium {
              alt_text
              id
              url
              dimensions
            }
            format {
              name
              slug
              id
              description
            }
          }
        }
        recentPosts:posts{
          nodes{
          id
          title
          slug
          published_date
          excerpt
          users {
            email
            first_name
            last_name
            display_name
            slug
            id
          }
          medium{
          url
          }
         }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (!data || !data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recentPosts: data.recentPosts,
      post: data.post,
      posts: data.posts,
    },
  };
}
