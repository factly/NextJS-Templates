/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { jsx } from 'theme-ui';
import { FaHome, FaBars } from 'react-icons/fa';
import isBrowser from 'apps/iris/src/helpers/isBrowser';
/**
 * @component Navbar
 * @typedef Props
 * @prop {string} logo - url for logo
 * @param {Props} props - arguments for Navbar with logo and menu properties
 * @param {string} props.logo - url for logo
 * @param {Object} props.menu - menu item
 */

const Navbar = ({ logo, menu }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(0);

  /**
   * Updates width when resized for responsiveness of menu item
   */
  const updateWidth = () => {
    const windowWidth = isBrowser && window.innerWidth;
    setWidth(windowWidth);
  };

  useEffect(() => {
    updateWidth();
    isBrowser && window.addEventListener('resize', updateWidth);
    if (width >= 1080) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
    return () => isBrowser && window.removeEventListener('resize', updateWidth);
  }, [width]);

  const handleClick = () => {
    setShowMenu((prevState) => !prevState);
  };
  return (
    <React.Fragment>
      <div
        sx={{
          position: 'fixed',
          zIndex: '9999',
          top: 0,
          left: 0,
          right: 0,
          bg: (theme) => `${theme.colors.bgLight}`,
          borderBottomWidth: '1px',
        }}
      >
        <nav
          sx={{
            position: 'sticky',
            display: 'flex',
            maxWidth: '1560px',
            minHeight: '60px',
            mx: 'auto',
            flexWrap: ['wrap', null, null, 'wrap'],
            alignItems: 'center',
            justifyContent: ['space-between', null, null, 'flex-start'],
            px: (theme) => `${theme.space.spacing5}`,
            py: (theme) => `${theme.space.spacing3}`,
            fontWeight: '600',
            fontSize: '32px',
            '& a:hover': {
              color: (theme) => `${theme.colors.textLinkHoverPrimary}`,
            },
          }}
        >
          <Link
            passHref href="/">
            <a
              sx={{
                position: ['relative', null, null, 'absolute'],
                transform: ['none', null, null, 'translate(-50%,-50%)'],
                top: [null, null, null, '50%'],
                left: [null, null, null, '50%'],
                zIndex: 999,
              }}
            >
              <img sx={{ height: 8, mx: [null, null, null, 'auto'] }} src={logo} alt="factly" />
            </a>
          </Link>
          <button
            type="button"
            sx={{ display: [null, null, null, 'none'] }}
            onClick={() => handleClick()}
          >
            <FaBars />
          </button>
          <div
            sx={{
              display: showMenu ? 'flex' : 'none',
              zIndex: 998,
              position: 'relative',
              flexDirection: ['column', null, null, 'row'],
              flexGrow: 1,
              alignItems: 'center',
              flexBasis: '100%',
              overflow: 'hidden',
            }}
          >
            <ul
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: ['column', null, null, 'row'],
                listStyle: 'none',
              }}
            >
              <li sx={{ display: ['none', null, null, 'block'] }}>
                <Link
                  passHref href="/">
                  <a
                    sx={{
                      px: [
                        (theme) => `${theme.space.spacing3}`,
                        null,
                        null,
                        null,
                        (theme) => `${theme.space.spacing5}`,
                      ],
                      display: 'block',
                      py: (theme) => `${theme.space.spacing3}`,
                    }}
                  >
                    <FaHome />
                  </a>
                </Link>
              </li>

              {/* {mainMenu?.menu.map((menuItem, index) => (
                <li key={menuItem.title}>
                  <Link
                    key={`navbar-${index}`}
                    to={menuItem.url}
                    title={menuItem.title}
                    sx={{
                      px: [
                        (theme) => `${theme.space.spacing3}`,
                        null,
                        null,
                        null,
                        (theme) => `${theme.space.spacing5}`,
                      ],
                      display: 'block',
                      py: (theme) => `${theme.space.spacing3}`,
                      textTransform: 'uppercase',
                      fontWeight: 'semibold',
                      fontSize: [(theme) => `${theme.fontSizes.h8}`],
                      '&:focus': { outline: 'none' },
                    }}
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))} */}
            </ul>
            <ul
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: ['column', null, null, 'row'],
                listStyle: 'none',
                ml: [null, null, null, 'auto'],
              }}
            ></ul>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
