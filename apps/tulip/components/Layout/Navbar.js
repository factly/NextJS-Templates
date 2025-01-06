/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react';
import { jsx } from 'theme-ui';
import Link from 'next/link';
import ActiveLink from '../ActiveLink';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function NavBar({ logo, data }) {
  const { menu, categories, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(0);
  const [query, setQuery] = useState('');
  const router = useRouter();

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
  const defaultMenuItems = [
    { url: '/categories', title: 'Categories', name: 'Categories' },
    { url: '/authors', title: 'Authors', name: 'Authors' },
  ];
  return (
    <React.Fragment>
      <div>
        <div
          sx={{
            my: '0.5rem',
            mx: 'auto',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link href="/" passHref>
            <span sx={{ mx: 'auto' }}>
              <img
                src={space?.logo?.url?.proxy || `/logo.png`}
                alt={space.site_title}
                sx={{ maxWidth: '7rem', display: 'block', mx: 'auto' }}
              />
            </span>
          </Link>
        </div>
        <div className="c-header__bottom">
          <div className="l-grid">
            <nav
              className="c-nav-wrap"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <ul
                sx={{ textAlign: 'center' }}
                className="c-nav c-nav--main u-plain-list"
              >
                <li className="c-nav__item c-nav__item--primary">
                  <Link href="/" className="c-nav__link  c-nav__link--current ">
                    Home
                  </Link>
                </li>
                <li className="c-nav__item c-nav__item--primary">
                  <Link
                    href="/articles"
                    className="c-nav__link  c-nav__link--current "
                  >
                    Articles
                  </Link>
                </li>
                {/* {!mainMenu?.menu &&
                  defaultMenuItems.map((item) => (
                    <li className="c-nav__item c-nav__item--primary" key={item.title}>
                      <Link
                        href={item.url}
                        key={item.title}
                        className="c-nav__link  c-nav__link--current "
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                {mainMenu?.menu.map((item) => (
                  <li className="c-nav__item c-nav__item--primary" key={item.title}>
                    <Link
                      href={item.url}
                      key={item.title}
                      className="c-nav__link  c-nav__link--current "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))} */}
              </ul>
              <div
                className="search_field"
                sx={{ display: 'flex', mx: 'auto' }}
              >
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
              </div>
            </nav>
          </div>
        </div>
        <div
          sx={{
            boxShadow: 'inset 0 -15px 5px -16px #111',
            // inset 0 15px 5px -16px #111'
            display: 'flex',
            justifyContent: [null, null, null, 'center'],
            fontSize: '0.75rem',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            mb: '2rem',
          }}
        >
          {mainMenu?.menu.map((item) => (
            <ActiveLink
              href={item.url}
              key={item.title}
              passHref
              activeClassName="active"
            >
              <span
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
              </span>
            </ActiveLink>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
