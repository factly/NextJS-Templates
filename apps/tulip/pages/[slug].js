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
import Layout from '../components/Layout';
import isBrowser from '../src/utils/isBrowser';


const PostDetails = ({ post, posts }) => {
  console.log({ posts })

  const latestPosts = posts.nodes.slice(0, 5).filter(({ id }) => id !== post.id).slice(0, 4);

  //const { posts, space, post, recentPosts } = data;
  //const postEdge = posts.nodes.filter(({ node }) => node.id === post.id)[0];
  // const relatedPosts = posts.nodes
  //   .filter((node) => {
  //     if (post.categories.length > 0) {
  //       return post.categories.find((category) => category.id === post.categories[0].id);
  //     }
  //   })
  //   .slice(0, 4);
  //const { previous: previousPost, next: nextPost } = postEdge;

  const [showSocialIcon, setShowSocialIcon] = React.useState(false);

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

  const createObserver = () => {
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.hasAttribute('social-icon')) {
          handleShowSocialIcon(entry);
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
      <div>
        <Post key={`details${post.id}`} post={post} observer={observer} />
        <div className="c-section c-section--related">
          <div className="l-grid">
            {/* <div className="c-section-heading">
              <h2 className="c-section-heading__title">Related</h2>
            </div> */}
          </div>

          {/* <div className="l-grid l-grid--4-columns">
            {relatedPosts.map(({ node: post }) => (
              <StoryCard storyData={post} />
            ))}
          </div> */}
        </div>

        <div className="c-section c-section--latest">
          <div className="l-grid">
            <div className="c-section-heading">
              <h2 className="c-section-heading__title">Latest</h2>
            </div>
          </div>

          <div className="l-grid l-grid--4-columns">
            {latestPosts.map((post) => (
              <StoryCard storyData={post} />
            ))}
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
      post: data.post,
      posts: data.posts,
    },
  };
}
