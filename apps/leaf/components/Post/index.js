// /** @jsx jsx */
// /** @jsxRuntime classic */
// import React, { useRef, useEffect, createRef } from 'react'; // eslint-disable-line no-unused-vars
// import { jsx } from 'theme-ui';
// import PostInfo from './PostInfo';
// import ShareButtonGroup from './ShareButtonGroup';
// import FactCheckWidget from './FactCheckWidget';
// import Tag from './Tag';
// import Excerpt from './Excerpt';
// import parseEditorJsData from '../../src/utils/parseEditorJsData';
// import parseTiptapContent from '../../src/utils/parseTipTapEditorData';
// import parseDate from 'src/utils/parseDate';
// import StoryCard from 'components/StoryCard';
// import Link from 'next/link';
// /**
//  * TODO: URI encoding
//  * TODO: borderradius in theme ui
//  * TODO: Add backgroudn to embeds if failed like factly.in
//  */

// const Post = ({ post, storyData, categories }) => {
//   const postSection = useRef(null);
//   const headerSocialIcon = createRef();

//   const filteredClaims = post.claims?.filter((claim) => claim.review_sources);

//   useEffect(() => {
//     {
//       !post.is_page && (postSection.current);
//     }
//     {
//       !post.is_page && (headerSocialIcon.current);
//     }
//   }, [postSection, headerSocialIcon]);

//   // return (


//   //   <>
//   //     <article
//   //       post={post.id}
//   //       ref={postSection}
//   //       slug={post.slug}
//   //       sx={{
//   //         display: 'flex',
//   //         flexDirection: 'column',
//   //         px: (theme) => `${theme.space.spacing6}`,
//   //         my: (theme) => `${theme.space.spacing6}`,
//   //         fontSize: (theme) => `${theme.fontSizes.body}`,
//   //         '&:first-of-type': {
//   //           mt: 0,
//   //         },
//   //       }}
//   //     >
//   //       <div
//   //         sx={{
//   //           bg: (theme) => `${theme.colors.bgLight}`,
//   //           borderTopLeftRadius: 'default',
//   //           borderTopRightRadius: 'default',
//   //           borderBottomLeftRadius: 'none',
//   //           borderBottomRightRadius: 'none',
//   //           overflow: 'hidden',
//   //         }}
//   //       >
//   //         <h1
//   //           sx={{
//   //             fontWeight: 'bold',
//   //             fontSize: (theme) => [`${theme.fontSizes.h4}`, null, `${theme.fontSizes.h3}`],
//   //             py: (theme) => `${theme.space.spacing3}`,
//   //           }}
//   //         >
//   //           {post.title}
//   //         </h1>
//   //         {!post.is_page && (
//   //           <div
//   //             sx={{
//   //               display: 'flex',
//   //               flexDirection: ['column', null, 'row'],
//   //               justifyContent: 'space-between',
//   //             }}
//   //           >
//   //             <PostInfo
//   //               date={post.published_date}
//   //               users={post.users}
//   //               categories={post.categories}
//   //             />
//   //             <ShareButtonGroup
//   //               setRef={headerSocialIcon}
//   //               data={{
//   //                 url: encodeURIComponent(process.browser ? window.location.href : null),
//   //                 title: encodeURIComponent(post.title),
//   //               }}
//   //             />
//   //           </div>
//   //         )}
//   //       </div>
//   //       {!post.is_page && <Excerpt excerpt={post.excerpt} image={post.medium} />}

//   //       <div
//   //         sx={{
//   //           width: ['full'],
//   //           mx: 'auto',
//   //           fontSize: (theme) => `${theme.fontSizes.body}`,
//   //         }}
//   //       >
//   //         {post.claims && <FactCheckWidget claims={post.claims} />}
//   //         <div className="parsed">
//   //           {parseEditorJsData({ content: post.description, scripts: true })}
//   //         </div>
//   //         {post.claims &&
//   //           post.claims.map((claim, i) => (
//   //             <React.Fragment key={i}>
//   //               {post.claims.length > 1 && (
//   //                 <div
//   //                   sx={{
//   //                     bg: (theme) => `${theme.colors.bgPrimary}`,
//   //                     p: (theme) => `${theme.space.spacing5}`,
//   //                     mt: (theme) => `${theme.space.spacing5}`,
//   //                   }}
//   //                 >
//   //                   <div
//   //                     sx={{
//   //                       mb: (theme) => `${theme.space.spacing5}`,
//   //                     }}
//   //                   >
//   //                     <h4
//   //                       sx={{
//   //                         fontWeight: 'bold',
//   //                       }}
//   //                     >
//   //                       Claim:{' '}
//   //                     </h4>
//   //                     {claim.claim}
//   //                   </div>
//   //                   <div>
//   //                     <h4
//   //                       sx={{
//   //                         fontWeight: 'bold',
//   //                       }}
//   //                     >
//   //                       Fact:
//   //                     </h4>
//   //                     <p dangerouslySetInnerHTML={{ __html: claim.fact }} />
//   //                   </div>
//   //                 </div>
//   //               )}

//   //               <div className="parsed">
//   //                 {parseEditorJsData({ content: claim.description, scripts: true })}
//   //               </div>
//   //             </React.Fragment>
//   //           ))}
//   //         {/* Review Sources */}
//   //         {filteredClaims?.length > 0 && (
//   //           <div sx={{ mt: '1rem' }}>
//   //             <h4 sx={{ mb: '0.75rem', fontSize: '1.125rem' }}>Sources:</h4>
//   //             {filteredClaims.map((claim, i) => (
//   //               <React.Fragment key={i}>
//   //                 {filteredClaims.length > 1 && (
//   //                   <p sx={{ mb: '0.25rem', fontSize: '1rem' }}>
//   //                     <strong>Claim:</strong> {claim.claim}
//   //                   </p>
//   //                 )}
//   //                 {claim.review_sources.map((review, i) => (
//   //                   <a
//   //                     href={review.url}
//   //                     key={i}
//   //                     sx={{
//   //                       fontSize: '0.875rem',
//   //                       '&:hover': {
//   //                         textDecoration: 'underline',
//   //                         color: 'textLinkHoverPrimary',
//   //                       },
//   //                     }}
//   //                   >{`${review.description}, ${review.url}`}</a>
//   //                 ))}
//   //               </React.Fragment>
//   //             ))}
//   //           </div>
//   //         )}

//   //         <div
//   //           sx={{
//   //             display: 'flex',
//   //             flexWrap: 'wrap',
//   //             mt: (theme) => `${theme.space.spacing6}`,
//   //             pb: (theme) => `${theme.space.spacing6}`,
//   //             borderBottomWidth: '1px',
//   //           }}
//   //         >
//   //           <div
//   //             sx={{
//   //               display: 'flex',
//   //               flexWrap: 'wrap',
//   //               '& a:first-of-type': {
//   //                 ml: 0,
//   //               },
//   //             }}
//   //           >
//   //             {post.tags.map((tag, i) => (
//   //               <Tag key={i} url={tag.slug} name={tag.name} />
//   //             ))}
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </article>
//   //   </>
//   // );


//   return (
//     <>

//       <div sx={{
//         maxWidth: '900px',
//         mx: 'auto',
//         mb: '3rem',
//         textAlign: 'center'
//       }}>
//         <div sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           mb: '1rem',
//           mt: '4rem'
//         }}>
//           <div sx={{
//             display: 'flex'
//           }}>
//             <div sx={{
//               display: 'flex',
//               gap: '18px'
//             }}>

//               <p sx={{
//                 fontFamily: 'Inter',
//                 fontStyle: 'normal',
//                 fontWeight: 600,
//                 fontSize: '14px',
//                 lineHeight: '20px',
//                 color: '#000000',

//               }}> <Link key={post.id} href={`/author/${post?.users[0]?.slug}`}>
//                   <p>  {post?.users[0]?.display_name}</p>
//                 </Link></p>

//               <p sx={{
//                 display: 'flex',
//                 fontFamily: 'Inter',
//                 fontStyle: 'normal',
//                 fontWeight: 600,
//                 fontSize: '14px',
//                 lineHeight: '20px',
//                 color: '#002bff',
//                 gap: '12px'
//               }}>{post.categories.length > 0 && post.categories.map(category => {
//                 return (<Link passHref href={`/category/${category.slug}`} key={category.name}>
//                   {category.name}
//                 </Link>)

//               })}</p>
//             </div>
//             <p p sx={{
//               fontFamily: 'Inter',
//               fontStyle: 'normal',
//               fontWeight: 600,
//               fontSize: '14px',
//               lineHeight: '20px',
//               color: '#F55353',
//               ml: '24px'
//             }}>{parseDate(post.published_date)}</p>
//           </div>
//         </div>
//         <p sx={{
//           fontFamily: 'Inter',
//           fontStyle: 'normal',
//           fontWeight: 600,
//           fontSize: '48px',
//           lineHeight: '60px',
//           letterSpacing: '-0.02em',
//           color: '#101828',
//           textAlign: 'center',
//           mb: '1rem'
//         }}>{post.title}</p>
//         <p sx={{
//           fontFamily: 'Inter',
//           fontStyle: 'normal',
//           fontWeight: 400,
//           fontSize: '16px',
//           lineHeight: '24px',
//           color: '#667085',
//           mb: '1rem'
//         }}>{post.excerpt}</p>
//       </div>

//       <div sx={{
//         //maxWidth: '1100px'
//       }}>
//         <img src={post.medium?.url?.proxy} alt="" />
//       </div>

//       <hr />
//       <div
//         sx={{
//           width: '720px',
//           mx: 'auto',
//           fontSize: (theme) => `${theme.fontSizes.body}`,
//         }}
//       >
//         {post.claims && <FactCheckWidget claims={post.claims} />}
//         <div className="parsed">
//           {process.browser && parseTiptapContent(post.description_html)}
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
//                 {process.browser && parseTiptapContent(post.description_html)}
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
//       </div>

//     </>
//   )
// };

// export default Post;








// /** @jsx jsx */
// /** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import Head from 'next/head';
import { jsx } from 'theme-ui';
import Link from 'next/link';
import parseDate from 'apps/leaf/src/utils/parseDate';
import parseTiptapContent from 'apps/leaf/src/utils/parseTipTapEditorData';
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaWhatsappSquare,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
/**
 * TODO: URI encoding
 * TODO: borderradius in theme ui
 * TODO: Add backgroudn to embeds if failed like factly.in
 */

const Post = ({ post, previous, next }) => {
  // const title = encodeURIComponent(post.title);
  // let url;
  // if (isBrowser) {
  //   url = encodeURIComponent(window.location.href);
  // }

  return (
    <>
      {/* <Seo title={post.title} description={post.excerpt} /> */}
      <Head>
        {post.schemas &&
          post.schemas.map((schema, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
      </Head>
      <article className="sc-article post">
        <header className="sc-article-header sc-canvas">
          <span className="sc-article-meta">
            {post.users.length > 0 && (
              <>
                {' '}
                By{' '}
                <Link key={post.id} href={`/author/${post.users[0].slug}`}>
                  {post.users[0].display_name}
                </Link>
                {/* <span className="u-hidden u-hidden">,&nbsp;</span>
                    <span className="u-hidden ">&nbsp;and&nbsp;</span> */}
              </>
            )}{' '}
            {post.categories.length > 0 && (
              <>
                in{' '}
                <Link href={`/category/${post.categories[0].slug}`} className="sc-article-tag">
                  {post.categories[0].name}
                </Link>
              </>
            )}
            —
            <time
              className="c-timestamp c-topper__timestamp"
              dateTime={parseDate(post.published_at)}
            >
              {parseDate(post.published_at)}
              {/* <span className="c-timestamp__detail"> . 12:00 AM</span> */}
            </time>{' '}
          </span>

          <h1 className="sc-article-title">{post.title}</h1>

          <p className="sc-article-excerpt">{post.excerpt}</p>

          <figure className="sc-article-image">
            <img
              srcset={`${post.medium?.url?.proxy}?rs:fill/w:300 300w,
                    ${post.medium?.url?.proxy}?rs:fill/w:720 720w,
                    ${post.medium?.url?.proxy}?rs:fill/w:960 960w,
                    ${post.medium?.url?.proxy}?rs:fill/w:1200 1200w,
                    ${post.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
              sizes="(max-width: 1200px) 100vw, 1200px"
              src={`${post.medium?.url?.proxy}?rs:fill/w:1200`}
              alt={post.title}
            />
          </figure>
        </header>

        <div className="sc-content sc-canvas">{parseTiptapContent(post.description_html)}</div>

        <footer className="sc-article-footer sc-canvas">
          <nav className="sc-navigation">
            <div className="sc-navigation-previous">
              {previous && (
                <Link className="sc-navigation-link" href={`/${previous.slug}/`}>
                  <span className="sc-navigation-label">
                    <FaChevronLeft /> Previous issue
                  </span>
                  <h4 className="sc-navigation-title">{previous.title}</h4>
                </Link>
              )}
            </div>

            <div className="sc-navigation-middle"></div>

            <div className="sc-navigation-next">
              {next && (
                <Link className="sc-navigation-link" href={`/${next.slug}/`}>
                  <span className="sc-navigation-label">
                    Next issue
                    <FaChevronRight />
                  </span>
                  <h4 className="sc-navigation-title">{next.title}</h4>
                </Link>
              )}
            </div>
          </nav>
        </footer>
      </article>
    </>
  );
};

export default Post;
