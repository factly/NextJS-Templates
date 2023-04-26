/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react';
import { jsx } from 'theme-ui';
import { FaHome, FaBars, FaSistrix } from 'react-icons/fa';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';

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
        alignItems: 'center',
        gap: '7rem',
        ml: '12rem',
        mr: '10rem',
        mt: '2rem'
      }}>
        <div sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div>
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
          <p>
            <FaBars />
          </p>
        </div>
        <div sx={{

          border: '1px solid',
          width: '320px',
          height: '48px',
          borderRadius: '8px'
        }}>
          <div sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            paddingLeft: '12px'
          }}>
            <FaSistrix />
            <p>search</p>
          </div>
        </div>
        <div sx={{
          display: 'flex',
          gap: '32px',
          height: '48px',
          width: '200px',
          alignItems: 'center',
          ml: '25rem'
        }}>
          <Link href="/authors">
            <h4 sx={{
              fontSize: '16px',
            }}>Authors</h4>
          </Link>
          <Link href="/categories">
            <h4 sx={{
              fontSize: '16px',
            }}>Categories</h4>
          </Link>
        </div>
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
    </React.Fragment >
  );
}
