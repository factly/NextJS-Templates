//  * @component Navbar
//  * @typedef Props
//  * @prop {string} logo - url for logo
//  * @param {Props} props - arguments for Navbar with logo and menu properties
//  * @param {string} props.logo - url for logo
//  * @param {Object} props.menu - menu item
//  */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState } from 'react';
import Link from 'next/link';
import { jsx } from 'theme-ui';
import { FaHome, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

/**
 * @component Navbar
 * @typedef Props
 * @prop {string} logo - url for logo
 * @param {Props} props - arguments for Navbar with logo and menu properties
 * @param {string} props.logo - url for logo
 * @param {Object} props.menu - menu item
 */

const Navbar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { menu, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];

  const defaultMenuItems = [
    { url: '/categories', title: 'Categories', name: 'Categories' },
    { url: '/authors', title: 'Authors', name: 'Authors' },
  ];

  return (
    <div data-header="sticky">
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 header__left flex items-center">
              {/* <Link className="header__brand nav-current" href="/">
                {' '}
                <img src={space.logo?.url?.proxy} alt="logo" />
              </Link> */}
              <Link href="/" passHref>
                <span
                  sx={{
                    mx: 'auto',
                    fontSize: '32px',
                    fontWeight: '700',
                    '&:hover': { color: '#7450f7' },
                  }}
                >
                  PETAL
                </span>
              </Link>
              <div className="flex-1"></div>

              <div className="search_field mobile">
                <input type="text" placeholder="search" />
                <div sx={{ justifyContent: 'center' }}>
                  <button
                    href="javascript:;"
                    className="nav-icon search-icon flex m-x-auto js-search-button"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>
              <button
                className={`header__menu--toggle flex-cc js-menu-toggle ${
                  isOpen ? 'is-active' : ''
                }`}
                tabindex="0"
                type="button"
                title="Menu"
                aria-label="Menu"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <i className="icon icon-menu icon--sm">
                  <FaBars className="icon__svg" />
                </i>{' '}
                <i className="icon icon-x icon--sm">
                  <FaTimes className="icon__svg" />
                </i>{' '}
              </button>
            </div>

            <div
              className="col-md-6 col-lg-8 header__center middle-xs flex-1"
              tabindex="0"
            >
              <ul className="nav" role="menu">
                <li role="menuitem">
                  <Link href="/">
                    <span>Home</span>
                  </Link>
                </li>
                <li role="menuitem">
                  <Link href="/articles">
                    <span>Articles</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="search_field desktop">
              <input
                type="text"
                placeholder="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.keyCode === 13) {
                    // Call your route function here
                    const q = query;
                    setQuery(() => '');
                    router.push(`/articles?query=${q}`);
                  }
                }}
              />
              <div sx={{ justifyContent: 'center' }}>
                <button
                  href="javascript:;"
                  className="nav-icon search-icon flex m-x-auto js-search-button"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <nav className="menu js-menu" data-menu-active={isOpen}>
        <ul className="nav" role="menu">
          <li role="menuitem">
            <Link href="/">
              <i className="icon icon--sm">
                <FaHome />
              </i>{' '}
              <span>Home</span>
            </Link>
          </li>
          <li role="menuitem">
            <Link href="/articles">
              <span>Articles</span>
            </Link>
          </li>
          {/* {!mainMenu?.menu &&
            defaultMenuItems.map((item) => (
              <li role="menuitem" key={item.title}>
                <Link href={item.url}>
                  <i className="icon icon--sm">
                    <FaHome />
                  </i>{' '}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          {mainMenu?.menu.map((item) => (
            <li role="menuitem" key={item.title}>
              <Link href={item.url}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))} */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
