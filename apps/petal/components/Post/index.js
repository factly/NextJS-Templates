/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useRef, useEffect, createRef } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import PostInfo from './PostInfo';
import ShareButtonGroup from './ShareButtonGroup';
import FactCheckWidget from './FactCheckWidget';
import Tag from './Tag';
import Excerpt from './Excerpt';
import parseEditorJsData from '../../src/utils/parseEditorJsData';
import parseTiptapContent from '../../src/utils/parseTipTapEditorData';
import parseDate from 'apps/petal/src/utils/parseDate';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useThemeUI } from 'theme-ui';

/**
 * TODO: URI encoding
 * TODO: borderradius in theme ui
 * TODO: Add backgroudn to embeds if failed like factly.in
 */

const Post = ({ post }) => {
  const postSection = useRef(null);
  const headerSocialIcon = createRef();
  const { theme } = useThemeUI();
  const { rawColors: colors } = theme;
  const { socialFacebook, socialTwitter, socialWhatsapp } = colors;
  const h4 = 20;
  const filteredClaims = post.claims?.filter((claim) => claim.review_sources);

  useEffect(() => {
    {
      !post.is_page && (postSection.current);
    }
    {
      !post.is_page && (headerSocialIcon.current);
    }
  }, [postSection, headerSocialIcon]);

  return (
    <>
      <article
        post={post.id}
        ref={postSection}
        slug={post.slug}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: (theme) => `${theme.space.spacing6}`,
          my: (theme) => `${theme.space.spacing6}`,
          fontSize: (theme) => `${theme.fontSizes.body}`,
          '&:first-of-type': {
            mt: 0,
          },
        }}
      >
        <div
          sx={{
            bg: (theme) => `${theme.colors.bgLight}`,
            borderTopLeftRadius: 'default',
            borderTopRightRadius: 'default',
            borderBottomLeftRadius: 'none',
            borderBottomRightRadius: 'none',
            overflow: 'hidden',
          }}
        >
          <div sx={{
            marginBottom: '24px'
          }}>
            <h1
              sx={{
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '60px',
                textAlign: 'center',
                letterSpacing: ' -0.02em',
                color: '#101828',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
                marginBottom: "12px"
              }}
            >
              {post.title}
            </h1>
            <div>
              <p
                sx={{
                  marginBottom: '16px',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '30px',
                  textAlign: 'center',
                  color: '#667085',
                  flex: 'none',
                  order: 1,
                  alignSelf: 'stretch',
                  flexGrow: 0,
                }}>
                {parseDate(post.published_date)} -  3 min read
              </p>
            </div>
            <div
              sx={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
              {post.categories.length > 0 && post.categories.map(category => {
                return (<Link passHref href={`/category/${category.slug}`} key={category.name}>
                  <a sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    textAlign: 'center',
                    color: '#7855F7',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0,
                    background: '#F4F1FF',
                    borderRadius: '16px',
                    alignItems: 'center',
                    padding: '2px 10px'
                  }}>
                    {category.name}
                  </a>
                </Link>)
              })}
            </div>
          </div>
          <div>
            <img src={post.medium?.url?.proxy} alt="" />
          </div>


          {/* {!post.is_page && (
            <div
              sx={{
                display: 'flex',
                flexDirection: ['column', null, 'row'],
                justifyContent: 'space-between',
              }}
            >
              <PostInfo
                date={post.published_date}
                users={post.users}
                categories={post.categories}
              />
              <ShareButtonGroup
                setRef={headerSocialIcon}
                data={{
                  url: encodeURIComponent(process.browser ? window.location.href : null),
                  title: encodeURIComponent(post.title),
                }}
              />
            </div>
          )} */}
        </div>
        {/* {!post.is_page && <Excerpt excerpt={post.excerpt} image={post.medium} />} */}
        <div sx={{
          maxWidth: '940px',
          mx: 'auto'
        }}>
          <p>{post.excerpt}</p>
          <hr />

          <div
            sx={{
              width: ['full'],
              mx: 'auto',
              fontSize: (theme) => `${theme.fontSizes.body}`,
            }}
          >
            {post.claims && <FactCheckWidget claims={post.claims} />}
            <div className="parsed">
              {parseEditorJsData({ content: post.description, scripts: true })}
              {process.browser && parseTiptapContent(post.description_html)}
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
                    {process.browser && parseTiptapContent(claim.description_html)}
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
          <div
            sx={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px'
            }}
          >
            {post.tags.map((tag, i) => (
              <Tag key={i} url={tag.slug} name={tag.name} />
            ))}
          </div>
          <div
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: (theme) => `${theme.space.spacing6}`,
              pb: (theme) => `${theme.space.spacing6}`,
              borderBottomWidth: '2px',
            }}
          >

            <div sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',

            }}>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  width: '40px',
                  height: '40px',
                  background: 'black',
                  borderRadius: '200px',
                }}>
                <img src={post.medium?.urrl?.proxy} alt="" />

              </div>
              <div>
                <div><p>{post.users[0].display_name}</p></div>
                <div><p>{parseDate(post.published_date)} -  3 min read</p></div>
              </div>
            </div>
            <div sx={{
              display: 'flex'
            }}>

              <a
                title="Tweet it"
                href={`https://twitter.com/share?url=${encodeURIComponent(process.browser ? window.location.href : null)}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  padding: '10px',
                  gap: '8px',
                  width: '40px',
                  height: '40px',
                  background: ' #FFFFFF',
                  border: '1px solid #D0D5DD',
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '8px',
                  display: 'block',
                  m: (theme) => `${theme.space.spacing2}`,
                  fontWeight: 'semibold',
                  borderRadius: 'default'

                }}
              >
                <FaTwitter color="#98A2B3" fontSize={h4} />
              </a>



              <a
                title="Share on Facebook"
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(process.browser ? window.location.href : null)}}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  padding: '10px',
                  gap: '8px',
                  width: '40px',
                  height: '40px',
                  background: ' #FFFFFF',
                  border: '1px solid #D0D5DD',
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '8px',
                  display: 'block',
                  m: (theme) => `${theme.space.spacing2}`,
                  fontWeight: 'semibold',
                  borderRadius: 'default',
                }}
              >
                <FaFacebook color="#98A2B3" fontSize={h4} />
              </a>

              <a
                title="Share on WhatsApp"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(process.browser ? window.location.href : null)}}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  padding: '10px',
                  gap: '8px',
                  width: '40px',
                  height: '40px',
                  background: ' #FFFFFF',
                  border: '1px solid #D0D5DD',
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '8px',
                  display: 'block',
                  m: (theme) => `${theme.space.spacing2}`,
                  fontWeight: 'semibold',
                  borderRadius: 'default',
                }}
              >
                <FaWhatsapp color="#98A2B3" fontSize={h4} />
              </a>

            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Post;
