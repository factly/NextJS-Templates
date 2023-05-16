/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';

const Footer = () => (
  <footer sx={{ mt: '4rem', background: "#000", }}>
    <div
      sx={{
        display: 'flex',
        color: '#ffffffb3',
        justifyContent: ['center', 'space-between'],
        fontFamily: 'Inter',
        maxWidth: '1200px',
        fontStyle: 'normal',
        mx: 'auto',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '24px',
        borderTop: '1px solid #545454',
        py: '5rem',
        px: ['24px', null, null],
        flexWrap: 'wrap',
        gap: '2rem',
        a: {
          cursor: 'pointer',
        },
      }}
    >
      <div sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <p sx={{ color: '#FFF', fontSize: '20px', fontWeight: '700' }}>Lily</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
      <div
        sx={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '12px',
          a: {
            '&:hover': {
              color: '#fff',
            }
          }
        }}
      >
        <a>Data & privacy . </a>
        <a>Contact . </a>
        <a>Contribute</a>
      </div>
      <p>
        <a sx={{
          '&:hover': {
            color: '#fff',
          }
        }}>Powered by Dega</a>
      </p>
    </div>
  </footer>

);

export default Footer;
