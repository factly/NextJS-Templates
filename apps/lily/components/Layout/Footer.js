/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';

const FooterTwo = () => (
  <footer
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      height: '136px',
      alignItems: 'center',
      background: '#143F6B',
      color: '#98A2B3',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px'
    }}
  >
    <p>
      © 2022 Lily - All rights reserved
    </p>
    <p>
      Data & Privacy . Contact
    </p>
    <p>Powered by <Link passHref href="/"><a sx={{
      fontWeight: 600,
      color: '#F55353'
    }}>Lily</a></Link></p>

  </footer>
);

export default FooterTwo;
