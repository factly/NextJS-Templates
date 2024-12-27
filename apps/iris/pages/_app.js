// pages/_app.js
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/router';
import NProgress from 'nprogress';
import theme from '../src/utils/theme.js';
import Layout from '../components/Layout/index.js';
import '../styles/main.css';
import '../styles/styles.css';
import '../styles/Home.module.css';
import '../styles/normalize.css';
import '../styles/global.css';
import { client } from '../store/client';
import { gql } from 'graphql-tag';
import App from 'next/app';

// NProgress configuration remains the same
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout data={pageProps?.layoutData}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Get default app props
  const appProps = await App.getInitialProps(appContext);

  try {
    const { data: layoutData } = await client.query({
      query: gql`
        query Homepage {
          menu {
            nodes {
              menu
              id
              slug
              name
            }
          }
          space {
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
          categories {
            nodes {
              id
              slug
              name
              description
              meta_fields
              medium {
                url
                dimensions
              }
            }
          }
        }
      `,
    });

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        layoutData,
      },
    };
  } catch (error) {
    console.error('Error fetching layout data:', error);
    return appProps;
  }
};

export default MyApp;
