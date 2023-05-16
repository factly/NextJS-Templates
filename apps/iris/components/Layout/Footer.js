/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai'
import { TiSocialFacebook } from 'react-icons/ti'
import { AiOutlineInstagram } from 'react-icons/ai'

const Footer = () => (
  <footer
    sx={{
      width: '100%',
      padding: '2rem',
      bg: '#eff8fa',
      p: { textAlign: 'center' }
    }}
  >
    <h2 sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', mb: '1rem' }}>
      {' '}
      <Link
        href="/"
        sx={{
          display: 'flex',
          mx: 'auto',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '2.75rem',
          lineHeight: 1,
          fontWeight: 'bold',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        IRIS
      </Link>
    </h2>
    <p>Harpy is a modern classic blog theme. Use this theme for company blog, magazine, niche or personal blog</p>
    <div sx={{ display: 'flex', justifyContent: 'center', gap: '16px', mt: '32px' }}>
      <Link href=''><AiOutlineTwitter /></Link>
      <Link href=''><TiSocialFacebook /></Link>
      <Link href=''><AiOutlineInstagram /></Link>
      <Link href=''><AiFillGithub /></Link>    </div>
    <p sx={{ fontSize: '0.875rem', mt: '32px' }}>
      © {new Date().getFullYear()} Iris Theme - Created and maintained by Factly Media and Research
    </p>
  </footer>
);

export default Footer;
