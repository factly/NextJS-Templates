/** @jsx jsx */
/** @jsxRuntime classic */
import * as React from 'react'; // eslint-disable-line no-unused-vars
import { graphql } from 'graphql';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import Navbar from './Navbar';
import Footer from './Footer';
import { client } from 'apps/leaf/store/client';


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


