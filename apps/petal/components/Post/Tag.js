/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';

/**
 * TODO: 1. Add transitions, borderWidth, borderRadius to theme-ui
 */
const Tag = ({ url, name }) => {
  return (
    <Link href={`/tag/${url}`} passHref>
      <a
        sx={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          textAlign: 'center',
          color: '#7855F7',
          background: '#F4F1FF',
          borderRadius: '16px',
          alignItems: 'center',
          padding: '8px 10px',
          bg: (theme) => `${theme.colors.bgTag}`,
          color: (theme) => `${theme.colors.textTag}`,
          // textAlign: 'center',
          // color: (theme) => `${theme.colors.textTag}`,
          // fontSize: (theme) => `${theme.fontSizes.h8}`,
          // borderWidth: '1px',
          // borderColor: (theme) => `${theme.colors.borderTag}`,
          // borderRadius: 'default',
          // p: (theme) => `${theme.space.spacing3}`,
          // m: (theme) => `${theme.space.spacing3}`,
          // bg: (theme) => `${theme.colors.bgTag}`,
          // transition: '0.3s',
          // '&:hover': {
          //    color: (theme) => `${theme.colors.textTagHover}`,
          //   bg: (theme) => `${theme.colors.bgTagHover}`,
          // },
        }}
      >
        {name}
      </a>
    </Link>
  );
};

export default Tag;
