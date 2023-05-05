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
        justifyContent: "space-between",
        marginLeft: '4rem',
        alignItems: 'center',
        marginRight: '4rem',
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
        </div>
        <div sx={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          <Link href="/">
            Home
          </Link>
          <Link href="/authors">
            Authors
          </Link>
          <Link href="/categories">
            Categories
          </Link>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
}
