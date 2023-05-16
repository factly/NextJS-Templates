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
import isBrowser from '../src/utils/isBrowser';


const PostDetails = ({ post, posts }) => {
  //const { posts, space, post, recentPosts } = data;

  // for sharing links
  const title = encodeURIComponent(post.title);
  let url;
  if (isBrowser) {
    url = encodeURIComponent(window.location.href);
  }

  return (
    <section>
      {/* <Seo
        title={post.title}
        description={post.excerpt}
        image={`${post.medium?.url?.proxy}`}
        canonical={`${space.site_address}/${post.slug}`}
        type="article"
      /> */}
      <div className="site-content">
        <main id="site-main" className="site-main">
          <Post key={`details${post.id}`} post={post} />
          <aside className="read-more-wrap outer">
            {/* <div className="read-more inner">
              {recentPosts.nodes.slice(0, 3).map((post) => (
                <StoryCard post={post} />
              ))}
            </div> */}
          </aside>
        </main>
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
