/** @jsx jsx */
/** @jsxRuntime classic */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */

import { jsx } from 'theme-ui';
import React from 'react'; // eslint-disable-line no-unused-vars
import Link from 'next/link';
import _ from 'lodash';
import parseDate from '../src/utils/parseDate';
import { BsArrowUpRight } from 'react-icons/Bs'
import { FaTelegramPlane } from 'react-icons/Fa'
/**
 * TODO: Change the data structure of props
 * TODO: Make images more responsive
 * TODO: Make most of the items optional
 * TODO: Possibly increase padding
 * TODO: Probably change the name of the component to "Card"
 * TODO: Refactor to decrease repetition of code
 */

const StoryCard = ({
  storyData,
  cardStyle = 'basic',
  excerpt = false,
  type = 'article',
  imageSize = { width: 'full', height: 40 },
}) => (
  <>
    {cardStyle === 'tulip' && (
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // pt: (theme) => `${theme.space.spacing6}`,
          borderRadius: (theme) => `${theme.borderRadius.default}`,
          // boxShadow: (theme) => `${theme.boxShadow.default}`,
          backgroundColor: (theme) => `${theme.colors.background.default}`,
          color: (theme) => `${theme.colors.text.default}`,
          '& a:hover': {
            backgroundColor: (theme) => `${theme.colors.background.hover}`,
            color: (theme) => `${theme.colors.text.hover}`,
            textDecoration: 'underline',
          },
        }}
      >
        <div
          sx={{
            display: 'flex',
          }}
        >
          <div
            className="tulip"
            sx={{ display: 'flex', flexDirection: 'column', width: 'full', maxWidth: 'full' }}
          >
            <Link href={`/${storyData.slug}`}>

              <div sx={{ maxWidth: '100%', width: '100%', display: 'flex', overflow: 'hidden' }}>
                <div
                  sx={{
                    paddingBottom: '56.24999999%',
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <div
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: ' 100%',
                      background: '#eff8fa',
                    }}
                  >
                    <img
                      sx={{ height: '100%', objectFit: 'cover', width: '100%' }}
                      src={storyData.medium?.url.proxy}
                    />
                  </div>
                </div>
              </div>
            </Link>
            <div
              key={storyData.id}
              sx={{ borderTop: '1px solid #d9d9d9', display: 'block', py: '1rem', px: ['1rem', 0] }}
            >
              {storyData?.categories?.length > 0 && (
                <Link key={storyData.id}
                  href={`/category/${storyData.categories[0].slug}`}
                  passHref>
                  <a
                    sx={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: '#df1c22',
                      display: 'block',
                    }}
                  >
                    {storyData.categories[0].name}
                  </a>
                </Link>
              )}
              <Link key={storyData.id} href={`/${storyData.slug}`} passHref>
                <a sx={{ display: 'block' }}>
                  <h3 sx={{ fontSize: '1rem' }}>{storyData.title}</h3>
                </a>
              </Link>
              <Link key={storyData.id} href={`/author/${storyData?.users[0]?.slug}`} passHref>
                <a sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  {storyData?.users[0]?.display_name}
                </a>
              </Link>
              <p sx={{ fontSize: '0.675rem' }}>{parseDate(storyData.published_date)}</p>
            </div>
          </div>
        </div>
      </div>
    )}
    {cardStyle === 'basic' && (
      <article
        className={`${cardStyle}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 'tight',
          borderBottomWidth: '1px',
          '&:last-child': { borderBottomWidth: 0 },
          p: (theme) => `${theme.space.spacing6}`,
          borderColor: (theme) => `${theme.colors.borderPrimary}`,
        }}
      >
        <Link passHref href={`/${storyData.slug}`} className="vertical horizontal">
          <a
            sx={{
              width: 'full',
              display: 'flex',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none' },
            }}
          >
            <div
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                pr: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing3}`,
                ...imageSize,
              }}
            >
              {storyData.medium && (
                <img
                  alt={storyData.medium?.alt_text}
                  src={storyData.medium?.url.proxy}
                  sx={{
                    height: 'full',
                    width: 'full',
                    objectFit: 'cover',
                    borderRadius: 'default',
                  }}
                // onError={addDefaultSrc}
                />
              )}
            </div>
            <div sx={{ width: 'full', display: 'flex', flexDirection: 'column' }}>
              <p
                sx={{
                  color: (theme) => `${theme.colors.textLinkPrimary}`,
                  fontSize: (theme) => `${theme.fontSizes.h8}`,
                  px: (theme) => `${theme.space.spacing2}`,
                }}
              >
                {storyData.categories.map((category, i, arr) => (
                  <span key={i}>
                    {category.name}
                    {arr.length - i > 1 && ', '}
                  </span>
                ))}
              </p>
              <div
                id="nav-0"
                //className="active"
                sx={{
                  width: 'full',
                  fontWeight: 'bold',
                  fontSize: (theme) => `${theme.fontSizes.h6}`,
                  color: (theme) => `${theme.colors.textPrimary}`,
                }}
              >
                {storyData.title}
              </div>
              {excerpt && (
                <p
                  sx={{
                    color: (theme) => `${theme.colors.textPrimary}`,
                    fontSize: (theme) => `${theme.fontSizes.h7}`,
                    pt: (theme) => `${theme.space.spacing3}`,
                  }}
                >
                  {storyData.excerpt}
                </p>
              )}
              <div sx={{ display: 'flex', mt: 'auto', pt: (theme) => `${theme.space.spacing3}` }}>
                <div
                  className="vertical horizontal"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'full',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <p
                      sx={{
                        color: (theme) => `${theme.colors.textSecondary}`,
                        fontSize: [
                          (theme) => `${theme.fontSizes.h8}`,
                          null,
                          (theme) => `${theme.fontSizes.h7}`,
                        ],
                        mr: (theme) => `${theme.space.spacing3}`,
                        textTransform: 'none',
                      }}
                    >
                      {storyData.users.map((user, i, arr) => (
                        <span key={i}>
                          {`${user.first_name} ${user.last_name}`} {arr.length - i > 1 && ','}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p
                    sx={{
                      color: (theme) => `${theme.colors.textSecondary}`,
                      fontSize: [
                        (theme) => `${theme.fontSizes.h8}`,
                        null,
                        (theme) => `${theme.fontSizes.h7}`,
                      ],
                    }}
                  >
                    {parseDate(storyData.published_date)}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </article>
    )}

    {cardStyle === 'featured' && (
      <article
        sx={{
          bg: 'white',
          borderTopLeftRadius: 'default',
          borderTopRightRadius: 'default',
          borderBottomLeftRadius: 'none',
          borderBottomRightRadius: 'none',
          overflow: 'hidden',
          px: (theme) => `${theme.space.spacing6}`,
        }}
      >
        <Link passHref href={`/${storyData.slug}`}>
          <a
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none' },
            }}
          >
            <div
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // pr: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing3}`,
                ...imageSize,
              }}
            >
              {storyData.medium && (
                <img
                  alt={storyData.medium?.alt_text}
                  src={storyData.medium?.url.proxy}
                  sx={{
                    height: 'full',
                    width: 'full',
                    objectFit: 'cover',
                    borderRadius: 'default',
                  }}
                // onError={addDefaultSrc}
                />
              )}
            </div>

            <p
              sx={{
                width: 'full',
                color: (theme) => `${theme.colors.textSecondary}`,
                fontSize: [0, null, (theme) => `${theme.fontSizes.h8}`],
                pt: (theme) => `${theme.space.spacing3}`,
              }}
            >
              {storyData.subtitle}
            </p>
            <h2
              sx={{
                width: 'full',
                fontWeight: 'bold',
                fontSize: (theme) => `${theme.fontSizes.h6}`,
                lineHeight: 'tight',
                color: (theme) => `${theme.colors.textPrimary}`,
                overflowWrap: 'break-word',
              }}
            >
              {storyData.title}
            </h2>
            <p
              sx={{
                fontSize: (theme) => `${theme.fontSizes.bodyArticle}`,
                pt: (theme) => `${theme.space.spacing3}`,
                overflowWrap: 'break-word',
                color: (theme) => `${theme.colors.textPrimary}`,
              }}
            >
              {storyData.excerpt}
            </p>
          </a>
        </Link>
        <div sx={{ flex: 'none', mt: 'auto', py: (theme) => `${theme.space.spacing5}` }}>
          <div sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p
                sx={{
                  color: (theme) => `${theme.colors.gray[6]}`,
                  fontSize: [0, null, (theme) => `${theme.fontSizes.h8}`],
                  mr: (theme) => `${theme.space.spacing3}`,
                  textTransform: 'none',
                }}
              >
                {`${storyData.users[0]?.first_name} ${storyData.users[0]?.last_name}`}
              </p>
            </div>
            <p
              sx={{
                color: (theme) => `${theme.colors.textSecondary}`,
                fontSize: [0, null, (theme) => `${theme.fontSizes.h8}`],
              }}
            >
              {parseDate(storyData.published_date)}
            </p>
          </div>
        </div>
      </article>
    )}
    {cardStyle === 'vertical' && (
      <article
        className={` ${cardStyle}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 'tight',
          borderBottomWidth: '1px',
          '&:last-child': { borderBottomWidth: 0 },
          p: (theme) => `${theme.space.spacing6}`,
          borderColor: (theme) => `${theme.colors.borderPrimary}`,
        }}
      >
        <Link passHref href={`/${storyData.slug}`}>
          <a
            sx={{
              width: 'full',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none' },
            }}
          >
            <div
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                pr: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing3}`,
                ...imageSize,
              }}
            >
              {storyData.medium && (
                <img
                  alt={storyData.medium?.alt_text}
                  src={storyData.medium?.url.proxy}
                  sx={{
                    height: 'full',
                    width: 'full',
                    objectFit: 'cover',
                    borderRadius: 'default',
                  }}
                // onError={addDefaultSrc}
                />
              )}
            </div>
            <div sx={{ width: 'full', display: 'flex', flexDirection: 'column' }}>
              <div
                id="nav-0"
                //  className="active"
                sx={{
                  width: 'full',
                  fontWeight: 'bold',
                  fontSize: (theme) => `${theme.fontSizes.h6}`,
                  color: (theme) => `${theme.colors.textPrimary}`,
                }}
              >
                {storyData.title}
              </div>
              <p
                sx={{
                  color: (theme) => `${theme.colors.textPrimary}`,
                  fontSize: (theme) => `${theme.fontSizes.h7}`,
                  pt: (theme) => `${theme.space.spacing3}`,
                }}
              >
                {storyData.excerpt}
              </p>

              <div sx={{ display: 'flex', mt: 'auto', pt: (theme) => `${theme.space.spacing3}` }}>
                <div
                  className="vertical horizontal"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'full',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <p
                      sx={{
                        color: (theme) => `${theme.colors.textSecondary}`,
                        fontSize: [0, null, (theme) => `${theme.fontSizes.h8}`],
                        mr: (theme) => `${theme.space.spacing3}`,
                        textTransform: 'none',
                      }}
                    >
                      {`${storyData.users[0]?.first_name} ${storyData.users[0]?.last_name}`}
                    </p>
                  </div>
                  <p
                    sx={{
                      color: (theme) => `${theme.colors.textSecondary}`,
                      fontSize: [0, null, (theme) => `${theme.fontSizes.h8}`],
                    }}
                  >
                    {parseDate(storyData.published_date)}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </article>
    )}
    {cardStyle === 'withoutimage' && <article>card without image</article>}
    {cardStyle === 'card' && (
      <Link passHref href={`/${storyData.slug}`}>
        <a
          sx={{
            width: 'full',
            textDecoration: 'none',
            transition: 'all 0.5s',
            '&:hover': { textDecoration: 'none', transform: 'scale(1.04)' },
          }}
        >
          <article
            sx={{
              display: 'flex',
              flexDirection: ['column', 'row'],
              borderWidth: '1px',
              m: (theme) => `${theme.space.spacing2} ${theme.space.spacing5}`,
              borderRadius: 'lg',
            }}
          >
            <div
              style={{ minWidth: '15rem', maxWidth: '15rem', maxHeight: '15rem' }}
              sx={{ borderRadius: 'lg' }}
            >
              {storyData.medium && (
                <img
                  alt={storyData.medium?.alt_text}
                  src={storyData.medium?.url.proxy}
                  sx={{
                    height: 'full',
                    width: 'full',
                    objectFit: 'cover',
                    borderRadius: 'default',
                  }}
                //onError={addDefaultSrc}
                />
              )}
            </div>
            <div
              sx={{
                p: (theme) => `${theme.space.spacing6}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <h2 sx={{ pb: (theme) => `${theme.space.spacing3}` }}>{storyData.title}</h2>
              <p sx={{ fontSize: (theme) => `${theme.fontSizes.h8}` }}>
                {_.truncate(storyData.excerpt, {
                  length: 150,
                  separator: /,?\.* +/,
                })}
              </p>
              <p
                sx={{
                  fontSize: (theme) => `${theme.fontSizes.h8}`,
                  pt: (theme) => `${theme.space.spacing3}`,
                  color: (theme) => `${theme.colors.gray[5]}`,
                }}
              >
                <span>{`${storyData.users[0]?.first_name} ${storyData.users[0]?.last_name}`}</span>
                {' / '}
                <span>{parseDate(storyData.published_date)}</span>
              </p>
            </div>
          </article>
        </a>
      </Link>
    )}
    {cardStyle === 'iframely' && (
      <div
        sx={{
          display: 'flex',
          border: '1px solid rgb(222,222,222)',
        }}
      >
        <div
          className="iframely-card"
          sx={{ display: 'flex', flexDirection: 'column', width: 'full', maxWidth: 'full' }}
        >
          <div sx={{ maxWidth: '100%', width: '100%', display: 'flex', overflow: 'hidden' }}>
            <div
              sx={{
                paddingBottom: '56.24999999%',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
              }}
            >
              <div sx={{ position: 'absolute', width: '100%', height: ' 100%' }}>
                <Link passHref href={`/${storyData.slug}`}>
                  <a
                    sx={{
                      zIndex: 20,
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      textDecoration: 'none',
                      touchAction: 'manipulation',
                    }}
                  >
                    <img
                      sx={{ height: '100%', objectFit: 'cover', width: 'full' }}
                      src={storyData.medium?.url.proxy}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Link passHref href={`/${storyData.slug}`}>
            <a
              sx={{
                p: (theme) => `${theme.space.spacing4}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: '1 0 auto',
              }}
            >
              <h3 sx={{ fontSize: (theme) => `${theme.fontSizes.h6}` }}>{storyData.title}</h3>
              {excerpt && (
                <p sx={{ fontSize: (theme) => `${theme.fontSizes.bodySmall}` }}>
                  {_.truncate(storyData.excerpt, {
                    length: 150,
                    separator: /,?\.* +/,
                    omission: '...',
                  })}
                </p>
              )}
              <div
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  span: {
                    mr: (theme) => `${theme.space.spacing2}`,
                    fontSize: (theme) => `${theme.fontSizes.bodyExtraSmall}`,
                    color: '#919191',
                  },
                }}
              >
                {storyData.format && (
                  <>
                    <span>{storyData.format.name}</span>
                    <span>/</span>
                  </>
                )}
                {storyData.users[0]?.first_name && (
                  <>
                    <span>{`${storyData.users[0]?.first_name} ${storyData.users[0]?.last_name}`}</span>
                    <span>/</span>
                  </>
                )}
                <span>{parseDate(storyData.published_date)}</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    )}
    {cardStyle === 'iframely-small' && (
      <div
        sx={{
          display: 'flex',
          my: (theme) => `${theme.space.spacing5}`,
          border: '1px solid rgb(222,222,222)',
        }}
      >
        <div
          className="iframely-small"
          sx={{ display: 'flex', alignItems: 'center', width: 'full', maxWidth: 'full' }}
        >
          <div sx={{ width: '150px', maxWidth: '150px', height: '150px' }}>
            <Link passHref href={`/${storyData.slug}`}>
              <a
                sx={{
                  display: 'block',
                  width: '150px',
                  height: '150px',
                  background: 'no-repeat center',
                  backgroundSize: ' cover',
                  backgroundImage: `url(${storyData.medium?.url.proxy.replace(
                    '/dega.factly.in/',
                    '/',
                  )})`,
                  textDecoration: 'none',
                  touchAction: 'manipulation',
                }}
              ></a>
            </Link>
          </div>
          <Link passHref href={`/${storyData.slug}`}>
            <a
              sx={{
                p: (theme) => `${theme.space.spacing4}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <h3>{storyData.title}</h3>
              <p sx={{ fontSize: (theme) => `${theme.fontSizes.bodySmall}` }}>
                {_.truncate(storyData.excerpt, {
                  length: 150,
                  separator: /,?\.* +/,
                  omission: '...',
                })}
              </p>
              <div
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  span: {
                    mr: (theme) => `${theme.space.spacing3}`,
                    fontSize: (theme) => `${theme.fontSizes.h8}`,
                    color: '#919191',
                  },
                }}
              >
                {storyData.format && (
                  <>
                    <span>{storyData.format.name}</span>
                    <span>/</span>
                  </>
                )}
                {storyData.users[0]?.first_name && (
                  <>
                    {' '}
                    <span>{`${storyData.users[0]?.first_name} ${storyData.users[0]?.last_name}`}</span>
                    <span>/</span>
                  </>
                )}
                <span>{parseDate(storyData.published_date)}</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    )}
    {
      cardStyle === 'simple' && (
        <>

          <div sx={{
            //mb: '3rem',
            mt: '4rem',
            width: '920px'
          }}>
            <div sx={{
              display: 'flex',
            }}>
              <p sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontSize: '14px',
                color: '#F55353',
                mb: '1rem'
              }}>{parseDate(storyData.published_date)}</p>
              <p sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontSize: '14px',
                color: '#667085',
                mb: '1rem'
              }}>.3 min read</p>
            </div>
            <Link href={`/${storyData.slug}`}>

              <div sx={{
                display: 'flex',

                //justifyContent: 'space-between'
              }}>
                <h2 sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '32px',
                  color: '#101828',
                  mb: '1rem'
                }}>{storyData.title}</h2>

                {/* <BsArrowUpRight /> */}
              </div>
            </Link>
            <p sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              color: '#667085'
            }}>{storyData.excerpt}</p>
          </div>

        </>

      )}
    {
      cardStyle === 'simple-two' && (
        <div sx={{
          background: '#FFE6E6',
          px: '32px',
          py: '32px',
          borderRadius: '16px',
          mt: '2rem',

        }}>
          <p sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '56px',
            height: '56px',
            background: '#FFD3D3',
            borderRadius: '28px',
            color: '#F55353',
            mb: '1rem'
          }}>
            <FaTelegramPlane />
          </p>
          <h2 sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            color: '#F55353',
            mb: '1rem'
          }}>News Letter</h2>
          <p sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#101828',
            mb: '1.5rem'
          }}>Sign up now to get access to the library of members-only issues.</p>
          <input sx={{
            padding: '12px 14px 12px 16px',
            background: '#FFFFFF',
            border: '1px solid #D0D5DD',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: '8px',
            color: '#667085',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            mb: '0.5rem'
          }} type="text" placeholder='Enter your email' />
          <p sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#101828',
            mb: '1rem'
          }}>Read about our privacy policy</p>
          <button sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            bg: '#F55353',
            color: '#FFFFFF',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: '8px',
            width: '280px',
            padding: '12px '
          }}>
            Subscribre
          </button>
        </div>
      )
    }

    {
      cardStyle === 'simple-three' && (
        <div sx={{
          mt: '3rem'
        }}>
          <div sx={{
            display: 'flex',
          }}>
            <p sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontSize: '14px',
              color: '#F55353',
              mb: '1rem'
            }}>{parseDate(storyData.published_date)}</p>
            <p sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontSize: '14px',
              color: '#667085',
              mb: '1rem'
            }}>.3 min read</p>
          </div>
          <div sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Link href={`/${storyData.slug}`}>
              <h2 sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '32px',
                color: '#101828',
                mb: '1rem'
              }}>{storyData.title}</h2>
            </Link>
            {/* <BsArrowUpRight /> */}
          </div>
          <p sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            color: '#667085'
          }}>{storyData.excerpt}</p>
        </div>
      )
    }
  </>
);

export default StoryCard;