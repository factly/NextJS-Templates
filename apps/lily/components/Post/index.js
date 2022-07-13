/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useRef, useEffect, createRef } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import PostInfo from './PostInfo';
import ShareButtonGroup from './ShareButtonGroup';
import FactCheckWidget from './FactCheckWidget';
import Tag from './Tag';
import Excerpt from './Excerpt';
import Link from 'next/link';
import parseEditorJsData from '../../src/utils/parseEditorJsData';
import StoryCard from '../StoryCard';
import parseDate from '../../src/utils/parseDate';
/**
 * TODO: URI encoding
 * TODO: borderradius in theme ui
 * TODO: Add backgroudn to embeds if failed like factly.in
 */

const Post = ({ post }) => {
  const postection = useRef(null);


  const headerSocialIcon = createRef();

  const filteredClaims = post.claims?.filter((claim) => claim.review_sources);

  useEffect(() => {
    {
      !post.is_page && (postection.current);
    }
    {
      !post.is_page && (headerSocialIcon.current);
    }
  }, [postection, headerSocialIcon]);

  // return (

  //   <>
  //     <article
  //       post={post.id}
  //       ref={postection}
  //       slug={post.slug}
  //       sx={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         px: (theme) => `${theme.space.spacing6}`,
  //         my: (theme) => `${theme.space.spacing6}`,
  //         fontSize: (theme) => `${theme.fontSizes.body}`,
  //         '&:first-of-type': {
  //           mt: 0,
  //         },
  //       }}
  //     >
  //       <div
  //         sx={{
  //           bg: (theme) => `${theme.colors.bgLight}`,
  //           borderTopLeftRadius: 'default',
  //           borderTopRightRadius: 'default',
  //           borderBottomLeftRadius: 'none',
  //           borderBottomRightRadius: 'none',
  //           overflow: 'hidden',
  //         }}
  //       >
  //         <h1
  //           sx={{
  //             fontWeight: 'bold',
  //             fontSize: (theme) => [`${theme.fontSizes.h4}`, null, `${theme.fontSizes.h3}`],
  //             py: (theme) => `${theme.space.spacing3}`,
  //           }}
  //         >
  //           {post.title}
  //         </h1>
  //         {!post.is_page && (
  //           <div
  //             sx={{
  //               display: 'flex',
  //               flexDirection: ['column', null, 'row'],
  //               justifyContent: 'space-between',
  //             }}
  //           >
  //             <PostInfo
  //               date={post.published_date}
  //               users={post.users}
  //               categories={post.categories}
  //             />
  //             <ShareButtonGroup
  //               setRef={headerSocialIcon}
  //               data={{
  //                 url: encodeURIComponent(process.browser ? window.location.href : null),
  //                 title: encodeURIComponent(post.title),
  //               }}
  //             />
  //           </div>
  //         )}
  //       </div>
  //       {!post.is_page && <Excerpt excerpt={post.excerpt} image={post.medium} />}

  //       <div
  //         sx={{
  //           width: ['full'],
  //           mx: 'auto',
  //           fontSize: (theme) => `${theme.fontSizes.body}`,
  //         }}
  //       >
  //         {post.claims && <FactCheckWidget claims={post.claims} />}
  //         <div className="parsed">
  //           {parseEditorJsData({ content: post.description, scripts: true })}
  //         </div>
  //         {post.claims &&
  //           post.claims.map((claim, i) => (
  //             <React.Fragment key={i}>
  //               {post.claims.length > 1 && (
  //                 <div
  //                   sx={{
  //                     bg: (theme) => `${theme.colors.bgPrimary}`,
  //                     p: (theme) => `${theme.space.spacing5}`,
  //                     mt: (theme) => `${theme.space.spacing5}`,
  //                   }}
  //                 >
  //                   <div
  //                     sx={{
  //                       mb: (theme) => `${theme.space.spacing5}`,
  //                     }}
  //                   >
  //                     <h4
  //                       sx={{
  //                         fontWeight: 'bold',
  //                       }}
  //                     >
  //                       Claim:{' '}
  //                     </h4>
  //                     {claim.claim}
  //                   </div>
  //                   <div>
  //                     <h4
  //                       sx={{
  //                         fontWeight: 'bold',
  //                       }}
  //                     >
  //                       Fact:
  //                     </h4>
  //                     <p dangerouslySetInnerHTML={{ __html: claim.fact }} />
  //                   </div>
  //                 </div>
  //               )}

  //               <div className="parsed">
  //                 {parseEditorJsData({ content: claim.description, scripts: true })}
  //               </div>
  //             </React.Fragment>
  //           ))}
  //         {/* Review Sources */}
  //         {filteredClaims?.length > 0 && (
  //           <div sx={{ mt: '1rem' }}>
  //             <h4 sx={{ mb: '0.75rem', fontSize: '1.125rem' }}>Sources:</h4>
  //             {filteredClaims.map((claim, i) => (
  //               <React.Fragment key={i}>
  //                 {filteredClaims.length > 1 && (
  //                   <p sx={{ mb: '0.25rem', fontSize: '1rem' }}>
  //                     <strong>Claim:</strong> {claim.claim}
  //                   </p>
  //                 )}
  //                 {claim.review_sources.map((review, i) => (
  //                   <a
  //                     href={review.url}
  //                     key={i}
  //                     sx={{
  //                       fontSize: '0.875rem',
  //                       '&:hover': {
  //                         textDecoration: 'underline',
  //                         color: 'textLinkHoverPrimary',
  //                       },
  //                     }}
  //                   >{`${review.description}, ${review.url}`}</a>
  //                 ))}
  //               </React.Fragment>
  //             ))}
  //           </div>
  //         )}

  //         <div
  //           sx={{
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             mt: (theme) => `${theme.space.spacing6}`,
  //             pb: (theme) => `${theme.space.spacing6}`,
  //             borderBottomWidth: '1px',
  //           }}
  //         >
  //           <div
  //             sx={{
  //               display: 'flex',
  //               flexWrap: 'wrap',
  //               '& a:first-of-type': {
  //                 ml: 0,
  //               },
  //             }}
  //           >
  //             {post.tags.map((tag, i) => (
  //               <Tag key={i} url={tag.slug} name={tag.name} />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </article>
  //   </>
  // );

  return (
    <>
      <div sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flexStart',
        padding: '0px 32px',
        gap: '32px',
      }}>
        <div sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flexStart',
          gap: '40px',
          //mt: '2.25rem'
        }}>
          <div sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',

          }}>
            <div sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flexStart',
              gap: '12px',
            }}>
              <div sx={{
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#F55353',
                display: 'flex',
                gap: '16px'
              }}>
                {post.categories.length > 0 && post.categories.map(category => {
                  return (<Link passHref href={`/category/${category.slug}`} key={category.name}>
                    <a sx={{}}>
                      {category.name}
                    </a>
                  </Link>)
                })}
              </div>
              <div sx={{
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '60px',
                letteSpacing: '-0.02em',
                color: '#101828'

              }}>
                {post.title}
              </div>
            </div>
            <div sx={{
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '30px',
              color: '#667085'
            }}>
              {post.excerpt}
            </div>
          </div>
          <div sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexDirection: 'row'
          }}>
            <div sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              width: '56px',
              height: '56px',
              background: 'black',
              borderRadius: '200px',
            }}>
              <img src="" alt="" />
            </div>
            <div>
              <div><p sx={{
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '28px',
              }}>{post.users[0].display_name}</p></div>
              <div><p sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#667085',
              }}>{parseDate(post.published_date)}</p></div>
            </div>
          </div>
        </div>
      </div>
      <div sx={{
        mt: '48px'
      }}>
        <img src={post.medium?.url?.proxy} alt="" />
      </div>

      <div
        sx={{
          width: '720px',
          mx: 'auto',
          fontSize: (theme) => `${theme.fontSizes.body}`,
        }}
      >
        {post.claims && <FactCheckWidget claims={post.claims} />}
        <div className="parsed">
          {parseEditorJsData({ content: post.description, scripts: true })}
        </div>
        {post.claims &&
          post.claims.map((claim, i) => (
            <React.Fragment key={i}>
              {post.claims.length > 1 && (
                <div
                  sx={{
                    bg: (theme) => `${theme.colors.bgPrimary}`,
                    p: (theme) => `${theme.space.spacing5}`,
                    mt: (theme) => `${theme.space.spacing5}`,
                  }}
                >
                  <div
                    sx={{
                      mb: (theme) => `${theme.space.spacing5}`,
                    }}
                  >
                    <h4
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Claim:{' '}
                    </h4>
                    {claim.claim}
                  </div>
                  <div>
                    <h4
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Fact:
                    </h4>
                    <p dangerouslySetInnerHTML={{ __html: claim.fact }} />
                  </div>
                </div>
              )}

              <div className="parsed">
                {parseEditorJsData({ content: claim.description, scripts: true })}
              </div>
            </React.Fragment>
          ))}
        {/* Review Sources */}
        {filteredClaims?.length > 0 && (
          <div sx={{ mt: '1rem' }}>
            <h4 sx={{ mb: '0.75rem', fontSize: '1.125rem' }}>Sources:</h4>
            {filteredClaims.map((claim, i) => (
              <React.Fragment key={i}>
                {filteredClaims.length > 1 && (
                  <p sx={{ mb: '0.25rem', fontSize: '1rem' }}>
                    <strong>Claim:</strong> {claim.claim}
                  </p>
                )}
                {claim.review_sources.map((review, i) => (
                  <a
                    href={review.url}
                    key={i}
                    sx={{
                      fontSize: '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: 'textLinkHoverPrimary',
                      },
                    }}
                  >{`${review.description}, ${review.url}`}</a>
                ))}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <hr />
      {/* <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, 'repeat( 2, 1fr )', 'repeat( 3, 1fr)'],
          px: [null, null, (theme) => `${theme.space.spacing6}`],
          mt: (theme) => `${theme.space.spacing7}`,
          gridGap: (theme) => `${theme.space.spacing7}`,
        }}
      >
        {posts.nodes.slice(0, 2).map((post) => (
          <StoryCard cardStyle="tulip" key={post.id} storyData={post} />
        ))}
      </div> */}
    </>
  )
};

export default Post;
