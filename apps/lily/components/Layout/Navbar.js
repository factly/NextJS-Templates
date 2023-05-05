/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react';
import { jsx } from 'theme-ui';
import Link from 'next/link';


export default function NavBar({ logo, data }) {
  const { menu, categories, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const windowWidth = window.innerWidth;
    setWidth(windowWidth);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    if (width >= 1024) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
    return () => window.removeEventListener('resize', updateWidth);
  }, [width]);

  const handleClick = () => {
    setShowMenu((prevState) => !prevState);
  };
  return (
    <React.Fragment>
      <div sx={{
        display: 'flex',
        gap: '48px',
        justifyContent: 'space-Between',
        mx: ['1rem', null, '3rem'],
        my: '12px'
      }}>
        <div
          sx={{
            // my: '0.5rem',
            // mx: 'auto',
            // textAlign: 'center',
            // display: 'flex',
            // justifyContent: 'center',
          }}
        >
          <Link href="/" passHref>
            <a sx={{ mx: 'auto' }}>
              <img
                src={space?.logo?.url?.proxy || `/logo.png`}
                alt={space.site_title}
                sx={{ maxWidth: '4rem', display: 'block', mx: 'auto' }}
              />
            </a>
          </Link>
        </div>
        <div sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/" >
            Home
          </Link>
          <Link href="/categories">
            Categories
          </Link>
          <Link href="/authors">
            Authors
          </Link>
        </div>
        {/* <div sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <a
              title="Share on Facebook"
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(process.browser ? window.location.href : null)}}`}
              target="_blank"
              rel="noopener noreferrer">
              <FaFacebook /></a>

            <a
              title="Share on Twitter"
              href={`https://www.twitter.com/share?url=${encodeURIComponent(process.browser ? window.location.href : null)}`}
              target="_blank"
              rel="noopener noreferrer">
              <FaTwitter /></a>

          </div>
          <p sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            padding: '12px',
            borderRadius: '10px',
            bg: '#F55353',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500'
          }}
          >
            <a href="">
              Subscribe</a>
          </p>
        </div> */}
        {/* <div
          sx={{
            boxShadow: 'inset 0 -15px 5px -16px #111',
            // inset 0 15px 5px -16px #111'
            display: 'flex',
            justifyContent: [null, null, null, 'center'],
            fontSize: '0.75rem',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
          {mainMenu?.menu.map((item) => (
            <ActiveLink href={item.url} key={item.title} passHref activeClassName="active">
              <a
                sx={{
                  p: '1rem 1.5rem',
                  display: 'block',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  '&:not(:first-of-type)': {
                    position: 'relative',
                  },
                  '&:not(:first-of-type)::before': {
                    borderLeft: '1px solid #ea364a',
                    content: `""`,
                    height: '1rem',
                    left: '-.5px',
                    overflow: 'hidden',
                    position: 'absolute',
                  },
                }}
              >
                {item.name}
              </a>
            </ActiveLink>
          ))}
        </div> */}

      </div>
      <hr />
    </React.Fragment>
  );
}
