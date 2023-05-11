/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { jsx } from 'theme-ui';
import {
  FaTwitterSquare, FaFacebookSquare, FaWhatsappSquare, FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import Post from '../components/Post';
import { client } from '../store/client';
import parseDate from 'apps/lily/src/utils/parseDate';


const PostDetails = ({ post: degaPost, space, post, recentPosts }) => {
  //const { post: degaPost, space, posts, recentPosts } = data;

  //const post = posts.nodes.filter(({ node }) => node.id === degaPost.id)[0];
  const { previous: previousPost, next: nextPost } = post;

  // for sharing links
  // const title = encodeURIComponent(degaPost.title);
  // let url;
  // if (isBrowser) {
  //   url = encodeURIComponent(window.location.href);
  // }

  return (
    <section>
      {/* <Seo
        title={degaPost.title}
        description={degaPost.excerpt}
        image={`${degaPost.medium?.url?.proxy}`}
        canonical={`${space.site_address}/${degaPost.slug}`}
        type="article"
      /> */}
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
          }}
        >
          <Post key={`details${degaPost.id}`} post={degaPost} />
          <div>
            <div
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                pb: (theme) => `${theme.space.spacing6}`,
                borderBottomWidth: '1px',
              }}
            >
              <div
                sx={{
                  flex: [null, null, '0 0 50%'],
                  maxWidth: [null, null, '50%'],
                  p: '1.5rem',
                  textAlign: 'left',
                }}
              >
                {previousPost && (
                  <>
                    <Link
                      href={`/${previousPost.slug}/`}
                      sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                      <span>
                        <FaChevronLeft />
                      </span>
                      <div>
                        <span sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          Previous Post
                        </span>
                        <h3>{previousPost.title}</h3>
                      </div>
                    </Link>
                  </>
                )}
              </div>
              <div
                sx={{
                  flex: [null, null, '0 0 50%'],
                  maxWidth: [null, null, '50%'],
                  ml: 'auto',
                  p: '1.5rem',
                  textAlign: 'right',
                }}
              >
                {nextPost && (
                  <>
                    <Link
                      href={`/${nextPost.slug}/`}
                      sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                    >
                      <div>
                        <span sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          Next Post
                        </span>
                        <h3>{nextPost.title}</h3>
                      </div>
                      <span>
                        <FaChevronRight />
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div
              sx={{
                mt: (theme) => `${theme.space.spacing6}`,
                pb: (theme) => `${theme.space.spacing6}`,
                borderBottomWidth: '1px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h5
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  alignSelf: 'center',
                  mb: '1.5rem',
                  '&:after': {
                    position: 'absolute',
                    content: '""',
                    width: '50%',
                    height: '1px',
                    borderBottom: '2px solid #3BB2F6',
                    bottom: '-2px',
                    left: '50%',
                    marginLeft: '-25%',
                  },
                }}
              >
                Recent Posts
              </h5>
              <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {recentPosts.nodes
                  .filter((post) => post.id !== degaPost.id)
                  .splice(0, 6)
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
                      <Link href={`/${post.slug}/`} sx={{ display: 'flex' }}>
                        <div sx={{ flex: '0 0 33%' }}>
                          <img src={post.medium.url.proxy} alt="" />
                        </div>
                        <div sx={{ flex: '0 0 67%', pl: '1rem' }}>
                          <h5 sx={{ mb: '1rem' }}>{post.title}</h5>
                          <p sx={{ fontSize: '0.75rem' }}>{parseDate(post.published_date)}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;


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
