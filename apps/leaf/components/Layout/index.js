/** @jsx jsx */
/** @jsxRuntime classic */
// import React from 'react'; // eslint-disable-line no-unused-vars
// import PropTypes from 'prop-types';
// import { jsx } from 'theme-ui';
// import Navbar from './Navbar';

// import Footer from './Footer';

// const Layout = ({ children, data }) => {
//   return (
//     <>
//       {data && data.menu && <Navbar data={data} />}
//       <main
//         style={{ maxWidth: '1560px' }}
//         sx={{
//           width: 'full',
//           fontSize: [(theme) => `${theme.fontSizes.h6}`, null, (theme) => `${theme.fontSizes.h5}`],
//           color: (theme) => `${theme.colors.textPrimary}`,
//           lineHeight: 'normal',
//           pt: [(theme) => `${theme.space.spacing5}`, 0, 0],
//           minHeight: 'calc(100vh - 60px)',
//           mx: 'auto',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         {children}
//       </main>
//       <Footer />
//     </>
//   );
// };

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default Layout;

import * as React from 'react'; // eslint-disable-line no-unused-vars
import { graphql } from 'graphql';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children, data }) => {
  const { space, menu } = data;
  return (
    <div className="is-head-b--a_n">
      <Navbar data={data} />
      <main>{children}</main>
      <Footer space={space} />
    </div>
  );
}
export default Layout;

export async function getStaticProps() {
  const data = await client.query({
    query: gql`
      menu: allDegaMenu {
        nodes {
          menu
          id
          slug
          name
        }
      }
      space: degaSpace {
        description
        name
        site_title
        tag_line
        site_address
        fav_icon {
          url
          dimensions
        }
        logo {
          url
          dimensions
        }
      }
    }
  `});
};


