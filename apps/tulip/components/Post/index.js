// /** @jsx jsx */
// /** @jsxRuntime classic */
// import React, { useRef, useEffect, createRef } from 'react'; // eslint-disable-line no-unused-vars
// import { jsx } from 'theme-ui';
// import PostInfo from './PostInfo';
// import ShareButtonGroup from './ShareButtonGroup';
// import FactCheckWidget from './FactCheckWidget';
// import Excerpt from './Excerpt';
// import parseTiptapContent from '../../src/utils/parseTipTapEditorData';
// import Head from 'next/head';
// import Link from 'next/link';
// import parseDate from 'apps/tulip/src/utils/parseDate';
// import { FaEnvelope, FaFacebook, FaFacebookF, FaLinkedin, FaTwitter } from 'react-icons/fa';

// /**
//  * TODO: URI encoding
//  * TODO: borderradius in theme ui
//  * TODO: Add backgroudn to embeds if failed like factly.in
//  */

// const Post = ({ post, observer }) => {
//   const postSection = useRef(null);
//   const headerSocialIcon = createRef();

//   useEffect(() => {
//     // observer.observe(postSection.current);
//     // observer.observe(headerSocialIcon.current);
//   }, [observer, postSection, headerSocialIcon]);

//   return (
//     <>
//       {/* <Seo title={post.title} description={post.excerpt} /> */}
//       <Head>
//         {post.schemas &&
//           post.schemas.map((schema, i) => (
//             <script key={i} type="application/ld+json">
//               {JSON.stringify(schema)}
//             </script>
//           ))}
//       </Head>
//       <div className="c-topper">
//         <div className="c-topper__content">
//           <div className="c-topper__tag c-tag">
//             {post.categories.length > 0 && (
//               <Link href={`/category/${post.categories[0].slug}`}>{post.categories[0].name}</Link>
//             )}
//           </div>

//           <h1 className="c-topper__headline">{post.title}</h1>

//           <p className="c-topper__standfirst">{post.excerpt}</p>

//           <div className="c-topper__meta">
//             <div>
//               <div className="c-byline c-topper__byline">
//                 {post.users.length > 0 && (
//                   <>
//                     <Link key={post.id} href={`/author/${post.users[0].slug}`}>
//                       {post.users[0].display_name}
//                     </Link>
//                     <span className="u-hidden u-hidden">,&nbsp;</span>
//                     <span className="u-hidden ">&nbsp;and&nbsp;</span>
//                   </>
//                 )}
//               </div>{' '}
//               <time
//                 className="c-timestamp c-topper__timestamp"
//                 dateTime={parseDate(post.published_at)}
//               >
//                 {parseDate(post.published_at)}
//                 {/* <span className="c-timestamp__detail"> . 12:00 AM</span> */}
//               </time>{' '}
//               {/* <div className="c-reading-time c-topper__reading-time">2 min read</div>{' '} */}
//             </div>
//             <ul className="c-share u-plain-list">
//               <li className="c-share__item">
//                 <a
//                   className="c-share__link"
//                   href={`https://twitter.com/share?text=${post.title}}&amp;url=${post.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 // onClick={() => {
//                 //   window.open(this.href, 'twitter-share', 'width=550, height=235');
//                 //   return false;
//                 // }}
//                 >
//                   <div className="icon icon--ei-sc-twitter icon--s c-share__icon">
//                     <FaTwitter className="icon__cnt" />
//                   </div>
//                   <span className="u-screenreader">Share on Twitter</span>
//                 </a>
//               </li>

//               <li className="c-share__item">
//                 <a
//                   className="c-share__link"
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${post.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 // onClick={() => {
//                 //   window.open(this.href, 'facebook-share', 'width=580, height=296');
//                 //   return false;
//                 // }}
//                 >
//                   <div className="icon icon--ei-sc-facebook icon--s c-share__icon">
//                     <FaFacebookF className="icon__cnt" />
//                   </div>
//                   <span className="u-screenreader">Share on Facebook</span>
//                 </a>
//               </li>

//               <li className="c-share__item">
//                 <a
//                   className="c-share__link"
//                   href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${post.slug}&amp;title=${post.title}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 // onClick={() => {
//                 //   window.open(this.href, 'linkedin-share', 'width=580, height=296');
//                 //   return false;
//                 // }}
//                 >
//                   <div className="icon icon--ei-sc-linkedin icon--s c-share__icon">
//                     <FaLinkedin className="icon__cnt" />
//                   </div>
//                   <span className="u-screenreader">Share on LinkedIn</span>
//                 </a>
//               </li>

//               <li className="c-share__item">
//                 <a
//                   className="c-share__link"
//                   href={`mailto:?subject=${post.title}&amp;body=@{post.url}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <div className="icon icon--ei-envelope icon--s c-share__icon">
//                     <FaEnvelope className="icon__cnt" />
//                   </div>
//                   <span className="u-screenreader">Share via Email</span>
//                 </a>
//               </li>
//             </ul>{' '}
//           </div>
//         </div>

//         <figure className="c-feature-image-figure">
//           <div className="c-feature-image-wrap">
//             <img
//               className="c-feature-image lazyloaded"
//               data-src={post.medium?.url?.proxy}
//               srcset={`${post.medium?.url?.proxy}?rs:fill/w:320 300w,
//                     ${post.medium?.url?.proxy}?rs:fill/w:640 720w,
//                     ${post.medium?.url?.proxy}?rs:fill/w:720 960w,
//                     ${post.medium?.url?.proxy}?rs:fill/w:960 1200w,
//                     ${post.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
//               sizes="(max-width: 1200px) 100vw, 1200px"
//               src={`${post.medium?.url?.proxy}?rs:fill/w:1200`}
//               alt={post.title}
//             />
//           </div>
//         </figure>
//       </div>
//       <article className="c-post post tag-opinion tag-hash-editors-picks">
//         {post.claims && <FactCheckWidget claims={post.claims} />}
//         {parseTiptapContent(post.description_html)}
//         <div
//           sx={{
//             width: ['full'],
//             mx: 'auto',
//           }}
//         >
//           {post.claims &&
//             post.claims.map((claim, i) => (
//               <React.Fragment key={i}>
//                 {post.claims.length > 1 && (
//                   <div
//                     sx={{
//                       bg: (theme) => `${theme.colors.bgPrimary}`,
//                       p: (theme) => `${theme.space.spacing5}`,
//                       mt: (theme) => `${theme.space.spacing5}`,
//                     }}
//                   >
//                     <div
//                       sx={{
//                         mb: (theme) => `${theme.space.spacing5}`,
//                       }}
//                     >
//                       <h4
//                         sx={{
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         Claim:{' '}
//                       </h4>
//                       {claim.claim}
//                     </div>
//                     <div>
//                       <h4
//                         sx={{
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         Fact:
//                       </h4>
//                       <p dangerouslySetInnerHTML={{ __html: claim.fact }} />
//                     </div>
//                   </div>
//                 )}

//                 <div
//                   className="parsed"
//                   dangerouslySetInnerHTML={{ __html: claim.description_html }}
//                 />
//               </React.Fragment>
//             ))}
//         </div>
//       </article>
//     </>
//   );
// };

// export default Post;






/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useRef, useEffect, createRef } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';
import parseDate from 'apps/tulip/src/utils/parseDate';
import parseTiptapContent from 'apps/tulip/src/utils/parseTipTapEditorData';
import { Head } from 'next/head';

/**
 * TODO: URI encoding
 * TODO: borderradius in theme ui
 * TODO: Add backgroudn to embeds if failed like factly.in
 */

const Post = ({ post }) => {
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

      <article className="article post tag-getting-started ">
        <header className="article-header de-canvas">
          <div className="article-tag post-card-tags">
            <span className="post-card-primary-tag">
              {post.categories.length > 0 && (
                <Link href={`/category/${post.categories[0].slug}/`}>{post.categories[0].name}</Link>
              )}
            </span>
          </div>

          <h1 className="article-title">{post.title}</h1>

          <p className="article-excerpt">{post.excerpt}</p>

          <div className="article-byline">
            <section className="article-byline-content">
              <ul className="author-list">
                <li className="author-list-item">
                  {post.users.length > 0 && (
                    <>
                      <Link
                        key={post.id}
                        href={`/author/${post.users[0].slug}`}
                        className="author-avatar"
                      >
                        <img
                          className="author-profile-image"
                          src={post.users[0].medium?.url?.proxy}
                          alt={post.users[0].display_name}
                        />
                      </Link>
                    </>
                  )}
                </li>
              </ul>

              <div className="article-byline-meta">
                <h4 className="author-name">
                  {post.users.length > 0 && (
                    <Link href={`/author/${post.users[0].slug}`}>{post.users[0].display_name}</Link>
                  )}
                </h4>
                <div className="byline-meta-content">
                  <time className="byline-meta-date" dateTime={parseDate(post.published_at)}>
                    {parseDate(post.published_at)}
                  </time>
                  {/* <span className="byline-reading-time">
                    <span className="bull">•</span> 2 min read
                  </span>  */}
                </div>
              </div>
            </section>
          </div>

          <figure className="article-image">
            <img
              srcset={`${post.medium?.url?.proxy}?rs:fill/w:320 300w,
                    ${post.medium?.url?.proxy}?rs:fill/w:640 720w,
                    ${post.medium?.url?.proxy}?rs:fill/w:720 960w,
                    ${post.medium?.url?.proxy}?rs:fill/w:960 1200w,
                    ${post.medium?.url?.proxy}?rs:fill/w:1200 2000w`}
              sizes="(max-width: 1200px) 100vw, 1200px"
              src={`${post.medium?.url?.proxy}?rs:fill/w:1200`}
              alt={post.title}
            />
          </figure>
        </header>

        {parseTiptapContent(post.description_html)}
      </article>
    </>
  );
};

export default Post;
