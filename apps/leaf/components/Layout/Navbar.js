/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
/** @jsxRuntime classic */
// import React, { useState, useEffect } from 'react';
// import { jsx } from 'theme-ui';
// import { FaHome, FaBars } from 'react-icons/fa';
// import Link from 'next/link';
// import ActiveLink from '../ActiveLink';

// export default function NavBar({ logo, data }) {
//   const { menu, categories, space } = data;
//   const mainMenu = menu.nodes.filter((i) => i.slug === 'main')[0];
//   const [showMenu, setShowMenu] = useState(false);
//   const [width, setWidth] = useState(0);

//   const updateWidth = () => {
//     const windowWidth = window.innerWidth;
//     setWidth(windowWidth);
//   };

//   useEffect(() => {
//     updateWidth();
//     window.addEventListener('resize', updateWidth);
//     if (width >= 1024) {
//       setShowMenu(true);
//     } else {
//       setShowMenu(false);
//     }
//     return () => window.removeEventListener('resize', updateWidth);
//   }, [width]);

//   const handleClick = () => {
//     setShowMenu((prevState) => !prevState);
//   };

//   return (
//     <>
//       <div sx={{
//         maxWidth: '950px',
//         mx: 'auto',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '36px',
//         pt: '1rem',

//       }}>
//         <div>
//           <Link href="/" passHref>
//             <a sx={{ mx: 'auto' }}>
//               <img
//                 src={space?.logo?.url?.proxy || `/logo.png`}
//                 alt={space.site_title}
//                 sx={{ maxWidth: '5rem', }}
//               />
//             </a>
//           </Link>
//         </div>
//         <hr />
//         <div sx={{
//           display: 'flex',
//           gap: '48px',
//           fontFamily: 'Inter',
//           fontStyle: 'normal',
//           fontWeight: 500,
//           fontSize: '16px',
//           lineHeight: '24px',
//           color: '#667085',
//         }}>
//           <Link href="/" >
//             <p>Home</p>
//           </Link>

//           <Link href="/" >
//             <p>About</p>
//           </Link>
//           <Link href="/" >
//             <p>Collection</p>
//           </Link>
//         </div>
//       </div>

//     </>
//   )
// }



/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
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
