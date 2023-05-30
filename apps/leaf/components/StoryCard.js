/** @jsx jsx */
/** @jsxRuntime classic */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */

// import { jsx } from 'theme-ui';
// import React from 'react'; // eslint-disable-line no-unused-vars
// import Link from 'next/link';
// import _ from 'lodash';
// import parseDate from '../src/utils/parseDate';
// import { BsArrowUpRight } from 'react-icons/Bs'
// import { FaTelegramPlane } from 'react-icons/Fa'
/**
 * TODO: Change the data structure of props
 * TODO: Make images more responsive
 * TODO: Make most of the items optional
 * TODO: Possibly increase padding
 * TODO: Probably change the name of the component to "Card"
 * TODO: Refactor to decrease repetition of code
 */


import React from 'react';
import parseDate from '../src/utils/parseDate';
import { jsx } from 'theme-ui';
import Link from 'next/link';


const StoryCard = ({ post, type = 'basic' }) => {
  return (
    <>
      {type === 'basic' && (
        <article className="sc-card post">
          <Link className="sc-card-link" href={`/${post.slug}/`}>
            <header className="sc-card-header">
              <h2 className="sc-card-title">{post.title}</h2>
            </header>

            <div className="sc-card-excerpt">{post.excerpt}</div>

            <footer className="sc-card-meta">
              <time className="sc-card-date" dateTime={parseDate(post.published_at)}>
                {parseDate(post.published_at)}
              </time>
              {/* <span className="sc-card-duration">2 min read</span> */}
            </footer>
          </Link>
        </article>
      )}
    </>
  );
};

export default StoryCard;
