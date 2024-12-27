import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return React.createElement(
      Html,
      null,
      React.createElement(
        Head,
        null,
        React.createElement('link', {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        }),
        React.createElement('link', {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'true',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '57x57',
          href: '/favicons/apple-icon-57x57.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '60x60',
          href: '/favicons/apple-icon-60x60.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '72x72',
          href: '/favicons/apple-icon-72x72.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: '/favicons/apple-icon-76x76.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '114x114',
          href: '/favicons/apple-icon-114x114.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: '/favicons/apple-icon-120x120.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '144x144',
          href: '/favicons/apple-icon-144x144.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: '/favicons/apple-icon-152x152.png',
        }),
        React.createElement('link', {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicons/apple-icon-180x180.png',
        }),
        React.createElement('link', {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/favicons/android-icon-192x192.png',
        }),
        React.createElement('link', {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicons/favicon-32x32.png',
        }),
        React.createElement('link', {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicons/favicon-96x96.png',
        }),
        React.createElement('link', {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicons/favicon-16x16.png',
        }),
        React.createElement('link', {
          rel: 'manifest',
          href: '/favicons/manifest.json',
        }),
        React.createElement('meta', {
          name: 'msapplication-TileColor',
          content: '#ffffff',
        }),
        React.createElement('meta', {
          name: 'msapplication-TileImage',
          content: '/favicons/ms-icon-144x144.png',
        }),
        React.createElement('meta', {
          name: 'theme-color',
          content: '#ffffff',
        }),
        React.createElement('meta', { name: 'robots', content: 'noindex' }),
        React.createElement('title', null, 'Iris')
      ),
      React.createElement(
        'body',
        null,
        React.createElement(Main),
        React.createElement(NextScript)
      )
    );
  }
}

export default MyDocument;
