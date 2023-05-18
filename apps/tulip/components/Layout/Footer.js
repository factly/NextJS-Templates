/** @jsx jsx */
/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';
import { AiOutlineTwitter } from 'react-icons/ai'
import { TiSocialFacebook } from 'react-icons/ti'
import { AiOutlineInstagram } from 'react-icons/ai'
import { RiLinkedinBoxFill } from 'react-icons/ri'
import { FaYoutube } from 'react-icons/fa'

const Footer = () => (
  <footer
    sx={{
      width: '100%',
      py: '2rem',
      bg: '#eff8fa',
    }}
  >
    <h2 sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
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
        TULIP
      </Link>
    </h2>
    <div sx={{ display: 'flex', justifyContent: 'center', gap: '16px', mt: '32px', a: { background: '#fff', borderRadius: '50%', padding: '12px' } }}>
      <Link href='https://twitter.com'><AiOutlineTwitter /></Link>
      <Link href='https://www.facebook.com'><TiSocialFacebook /></Link>
      <Link href='https://www.instagram.com'><AiOutlineInstagram /></Link>
      <Link href='https://www.linkedin.com'><RiLinkedinBoxFill /></Link>
      <Link href='https://www.youtube.com'><FaYoutube /></Link>
    </div>
    <p sx={{ textAlign: 'center', mt: '32px' }}>
      © 2022 Tulip Theme - Created and maintained by Factly Media and Research
    </p>
  </footer>
);

export default Footer;


