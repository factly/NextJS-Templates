/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';

const FooterTwo = () => (

  <footer>
    <div sx={{
      display: 'flex',
      justifyContent: 'space-around',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      color: '#545454',
      mt: '2.5rem'
    }}>
      <p>Quail © 2022</p>
      <div sx={{
        display: 'flex',
        gap: '16px'
      }}>
        <p>Data & privacy</p>
        <p>. Contact</p>
        <p>Contribute →</p>
      </div>
      <div sx={{
        display: 'flex',
        gap: '16px'
      }}>
        <p>Terms</p>
        <p>Privacy</p>
        <p>Cookies</p>
      </div>
    </div>
  </footer>
);

export default FooterTwo;
