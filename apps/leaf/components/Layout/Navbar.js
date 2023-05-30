/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import Link from 'next/link';

export default function NavBar({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { menu, space } = data;
  const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];

  const defaultMenuItems = [
    { url: '/categories', title: 'Categories', name: 'Categories' },
    { url: '/authors', title: 'Authors', name: 'Authors' },
  ];

  return (
    <div className={isMenuOpen ? 'is-head-open' : ''}>
      <header id="sc-head" className="sc-head sc-outer">
        <div sx={{ display: [null, null, null, 'flex'], alignItems: 'center', flexDirection: 'column', }}>
          <div className="sc-head-brand">
            <div className="sc-head-brand-wrapper">
              <Link className="sc-head-logo" href="/">
                {space.name}
              </Link>
            </div>

            <button className="sc-burger" onClick={() => setIsMenuOpen((prev) => !prev)}></button>
          </div>

          <nav className="sc-head-menu">
            <ul className="nav">
              <li className="nav-home nav-current">
                <Link href="/">Home</Link>
              </li>
              {!mainMenu?.menu &&
                defaultMenuItems.map((item) => (
                  <li className="nav-author" key={item.title}>
                    <Link href={item.url}>{item.name}</Link>
                  </li>
                ))}
              {mainMenu?.menu.map((item) => (
                <li className="nav-collection" key={item.title}>
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
              { }
            </ul>
          </nav>

          {/* <div className="sc-head-actions">

          </div> */}
        </div>
      </header>
    </div>
  );
}
