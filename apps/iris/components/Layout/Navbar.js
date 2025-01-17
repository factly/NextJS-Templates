'use client';
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState } from 'react';
import Link from 'next/link';
import { jsx } from 'theme-ui';
import { FaSearch } from 'react-icons/fa';
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
  const { menu, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];
  const router = useRouter();

  const defaultMenuItems = [
    { url: '/categories', title: 'Categories', name: 'Categories' },
    { url: '/authors', title: 'Authors', name: 'Authors' },
  ];
  const [query, setQuery] = useState('');

  return (
    <React.Fragment>
      <header
        sx={{ px: ['2rem', null, '2rem'] }}
        className="site-header has-theme-icon"
      >
        <div
          sx={{ justifyContent: 'space-between' }}
          className="header-inner flex"
        >
          <div className="header-logo flex">
            {/* Harpy theme logo */}

            {/* <Link href="/" className="logo-img theme-light-logo">
              <img src={space.logo?.url?.proxy} alt={space.name} />
            </Link>
            <Link href="/" className="logo-img theme-dark-logo">
              <img src={space.logo?.url?.proxy} alt={space.name} />
            </Link> */}
            <Link href="/">
              <h1 sx={{ fontSize: '42px' }}>IRIS</h1>
            </Link>
          </div>

          <input
            id="mobile-menu-toggle"
            className="mobile-menu-checkbox"
            type="checkbox"
          />
          <label
            for="mobile-menu-toggle"
            className="mobile-menu-icon"
            aria-label="menu toggle button"
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="sr-only">Menu toggle button</span>
          </label>

          <nav
            sx={{ li: { textAlign: 'center' } }}
            className="nav-wrap flex"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="nav-left no-style-list" role="menu">
              <li className="nav-item" role="menuitem">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item" role="menuitem">
                <Link href="/articles" className="nav-link">
                  Articles
                </Link>
              </li>
              {/* {!mainMenu?.menu &&
                defaultMenuItems.map((item) => (
                  <li className="nav-item" role="menuitem">
                    <Link href={item.url} className="nav-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              {mainMenu?.menu.map((item) => (
                <li className="nav-item" role="menuitem">
                  <Link href={item.url} className="nav-link">
                    {item.name}
                  </Link>
                </li>
              ))} */}

              {/* <li className=" has-dropdown">
                <a href="#" className="nav-link more-link">
                  More{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 18c-.39 0-.78-.132-1.097-.398L.617 9.03a1.713 1.713 0 112.194-2.633l9.208 7.673 9.192-7.397a1.715 1.715 0 012.15 2.671l-10.286 8.277A1.714 1.714 0 0112 18z"></path>
                  </svg>
                </a>
                <ul className="no-style-list dropdown-menu">
                  <li className="nav-item" role="menuitem">
                    <a href="/">Features</a>
                  </li>
                  <li className="nav-item" role="menuitem">
                    <a href="/">Elements</a>
                  </li>
                  <li className="nav-item" role="menuitem">
                    <a href="/">Tags</a>
                  </li>
                </ul>
              </li> */}
            </ul>
            <ul className="search_field">
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
              {/* <ul className="nav-right no-style-list" role="menu"></ul> */}
              <div sx={{ justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    if (query === '') return;
                    const q = query;
                    setQuery(() => '');
                    router.push(`/articles?query=${q}`);
                  }}
                  className="nav-icon search-icon flex m-x-auto js-search-button"
                >
                  <FaSearch />
                </button>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
