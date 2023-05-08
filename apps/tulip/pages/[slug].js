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

// export default function PostDetails({ post, posts }) {
//   const filteredPosts = posts.nodes.filter((p) => p.id !== post.id).slice(0, 6);

//   const [showSocialIcon, setShowSocialIcon] = React.useState(false);
//   const [postActiveIndex, setPostActiveIndex] = React.useState(parseInt(post.id));
//   const [observer, setObserver] = React.useState({
//     observe: () => { },
//   });

//   const handleShowSocialIcon = (entry) => {
//     if (entry.intersectionRatio > 0) {
//       setShowSocialIcon(false);
//     } else {
//       setShowSocialIcon(true);
//     }
//   };

//   const handleSetActiveLink = (entry) => {
//     const id = entry.target.getAttribute('slug');
//     if (entry.intersectionRatio > 0) {
//       setPostActiveIndex(id);
//     }
//   };

//   const createObserver = () => {
//     const o = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.target.hasAttribute('social-icon')) {
//           handleShowSocialIcon(entry);
//         }
//         if (entry.target.hasAttribute('post')) {
//           handleSetActiveLink(entry);
//         }
//       });
//     });
//     setObserver(o);
//   };
//   React.useEffect(() => {
//     createObserver();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   // for sharing links
//   const title = encodeURIComponent(post.title);
//   let url;
//   if (process.browser) {
//     url = encodeURIComponent(window.location.href);
//   }
//   return (
//     <>
//       <Head>
//         <title> {post.title} </title>
//         <meta name="description" content={post.excerpt} />
//         <meta property="og:title" content={post.title} />
//         <meta property="og:description" content={post.excerpt} />
//         {post.medium && <meta property="og:image" content={post.medium?.url.proxy} />}
//         <meta property="og:url" content={url} />
//         <meta property="og:type" content="article" />
//         {post.schemas &&
//           post.schemas.map((schema, i) => (
//             <script
//               key={i}
//               type="application/ld+json"
//               dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//             ></script>
//           ))}
//       </Head>
//       <div
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'center',
//           position: 'relative',
//         }}
//       >
//         <div
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             width: '100%',
//             maxWidth: 1024,
//             mx: 'auto',
//             p: [
//               (theme) => `${theme.space.spacing3}`,
//               null,
//               null,
//               (theme) => `${theme.space.spacing8}`,
//             ],
//             pl: (theme) => [null, null, `${theme.space.spacing8}`],
//           }}
//         >
//           <Post post={post} observer={observer} />
//         </div>
//       </div>
//     </>
//   );
// }


const PostDetails = ({ post, posts }) => {
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
            {/* <div className="c-section-heading">
              <h2 className="c-section-heading__title">Latest</h2>
            </div> */}
          </div>

          {/* <div className="l-grid l-grid--4-columns">
            {recentPosts.nodes.slice(0, 4).map((post) => (
              <StoryCard storyData={post} />
            ))}
          </div> */}
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
