/** @jsx jsx */
/** @jsxRuntime classic */
import Link from 'next/link';
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import StoryCard from './StoryCard';
// import Seo from '@components/Seo';

const Homepage = ({ data }) => {
  const { space, categories, factchecks, posts } = data;

  // TODo: Add pagination and featured categories

  return (
    <section className='container'>
      <div>
        <div className="grid post-feed js-post-feed">
          {posts.nodes.slice(0, 24).map((post) => (
            <StoryCard post={post} />
          ))}{' '}
        </div>
        <hr />
      </div>
    </section>
  );
};

export default Homepage;
