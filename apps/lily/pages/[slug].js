/** @jsx jsx */
/** @jsxRuntime classic */

import React from 'react';
import gql from 'graphql-tag';
import { jsx } from 'theme-ui';
import Post from '../components/Post';
import { client } from '../store/client';
import StoryCard from '../components/StoryCard';
import isBrowser from '../src/utils/isBrowser';
import Head from 'next/head';

const PostDetails = ({ post, posts, recentPosts, space }) => {


  //const { posts, space, post, recentPosts } = data;

  // for sharing links
  const title = encodeURIComponent(post.title);
  let url;
  if (isBrowser) {
    url = encodeURIComponent(window.location.href);
  }

  return (
    <section>
      <Head>
        <title> {post.title} </title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.medium?.url?.proxy} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        {post.schemas &&
          post.schemas?.map((schema, i) => (
            <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}>
            </script>
          ))}
      </Head>
      <div className="site-content">
        <main id="site-main" className="site-main">
          <Post key={`details${post.id}`} post={post} />
          <div sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', justifyContent: ['center', null, 'start'] }}>
            <h2>Recent posts</h2>
          </div>
          <aside className="read-more-wrap outer">
          </aside>
          <div className="read-more inner">
            {recentPosts.nodes.slice(0, 3).map((post) => (
              <StoryCard post={post} />
            ))}
          </div>
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
            categories {
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
