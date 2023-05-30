/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react';
import { jsx } from 'theme-ui';
import Link from 'next/link';


const Navbar = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { menu, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];

  const defaultMenuItems = [
    { url: '/categories', title: 'Categories', name: 'Categories' },
    { url: '/authors', title: 'Authors', name: 'Authors' },
  ];

  return (
    <React.Fragment>
      <header sx={{ bg: '#ff0095' }}
        id="de-head"
        className={`de-head outer  ${isMenuOpen ? 'de-head-open has-cover' : ''}`}
      >
        <nav sx={{ display: [null, null, null, 'flex'], justifyContent: 'space-between', maxWidth: '1200px', mx: 'auto', color: '#fff' }}>
          <div className="de-head-brand">
            <Link href="/" passHref>
              <a sx={{ mx: 'auto', fontSize: '32px', fontWeight: '700' }}>
                LILY
              </a>
            </Link>
            <div className="de-head-brand-wrapper">
              <button sx={{ background: 'none' }}
                className="de-burger"
                role="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <div className="de-burger-box">
                  <div className="de-burger-inner"></div>
                </div>
              </button>
            </div>
          </div>
          <div className="de-head-menu">
            <ul className="nav">
              <li className="nav-home">
                <Link href="/">Home</Link>
              </li>
              {!mainMenu?.menu &&
                defaultMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                ))}
              {mainMenu?.menu.map((item) => (
                <li key={item.title}>
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
