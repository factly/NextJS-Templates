/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/** @jsx jsx */
import React from 'react'; // eslint-disable-line no-unused-vars
import { graphql } from 'graphql';
import Link from 'next/link';
import { jsx } from 'theme-ui';
import Layout from '@components/Layout';
import generateFluidObject from 'src/helpers/generateFluidObject';


const PageNotFound = ({ data }) => {
  const space = data.degaSpace;
  return (
    <Layout>
      <div sx={{ textAlign: 'center' }}>
        <h1 sx={{ py: (theme) => `${theme.space.spacing7}` }}>Page Not Found</h1>
        <Link
          passHref href="/">
          <a
            sx={{
              py: (theme) => `${theme.space.spacing5}`,
              display: 'block',
              '&:hover': {
                color: (theme) => `${theme.colors.textLinkHoverPrimary}`,
              },
            }}
          >
            Go to HomePage
            <img
              alt={""}
              sx={{ mx: 'auto', display: 'block', maxWidth: 300 }}
              fluid={generateFluidObject({
                url: space.logo.url.proxy,
                dimensions: space.logo.dimensions,
              })}
            />
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
export const query = graphql`
  query {
    degaSpace {
      logo {
        url
        dimensions
      }
    }
  }
`;
