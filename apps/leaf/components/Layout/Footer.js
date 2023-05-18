/** @jsx jsx */
/** @jsxRuntime classic */
// import React from 'react'; // eslint-disable-line no-unused-vars
// import { jsx } from 'theme-ui';

// const FooterTwo = () => (

//   <footer>
//     <div sx={{
//       display: 'flex',
//       justifyContent: 'space-around',
//       fontFamily: 'Inter',
//       fontStyle: 'normal',
//       fontWeight: 400,
//       fontSize: '16px',
//       lineHeight: '24px',
//       color: '#545454',
//       mt: '2.5rem'
//     }}>
//       <p>Quail © 2022</p>
//       <div sx={{
//         display: 'flex',
//         gap: '16px'
//       }}>
//         <p>Data & privacy</p>
//         <p>. Contact</p>
//         <p>Contribute →</p>
//       </div>
//       <div sx={{
//         display: 'flex',
//         gap: '16px'
//       }}>
//         <p>Terms</p>
//         <p>Privacy</p>
//         <p>Cookies</p>
//       </div>
//     </div>
//   </footer>
// );

// export default FooterTwo;


/** @jsx jsx */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';

const Footer = () => (
  <footer sx={{ mt: '4rem' }}>
    <div
      sx={{
        display: 'flex',
        color: '#999',
        background: "#fff",
        justifyContent: 'space-around',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '24px',
        borderTop: '1px solid #545454',
        px: '5rem',
        py: '7rem',
        flexWrap: 'wrap',
        gap: '2rem',
        a: {
          cursor: 'pointer',
        },
      }}
    >
      <div sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <p sx={{ fontSize: '20px', fontWeight: '700' }}>Quail</p>
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
              color: '#000',
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
            color: '#000',
          }
        }}>Powered by Dega</a>
      </p>
    </div>
  </footer>
);

export default Footer;
