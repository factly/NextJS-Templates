/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';
import parseDate from '../src/utils/parseDate';
import StoryCard from './StoryCard';

function Homepage({ data }) {
  const { posts, featuredCategories } = data;
  const featuredPost = posts.nodes[0];


  return (
    <>
      <main sx={{ p: [null, null, null, '2rem'], pt: '2rem' }}>

        {/* posts Section  */}
        <div>
          <section sx={{ my: '1.5rem' }}>
            <h4 >{posts.name}</h4>
            <div
              sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', null, 'repeat( 2, 1fr )', 'repeat( 3, 1fr)'],
                px: [null, null, (theme) => `${theme.space.spacing6}`],
                mt: (theme) => `${theme.space.spacing7}`,
                gridGap: (theme) => `${theme.space.spacing7}`,
              }}
            >
              {posts.nodes.slice(0, 9).map((post) => (
                <StoryCard cardStyle="tulip" key={post.id} storyData={post} />
              ))}
            </div>
          </section>
        </div>
        <hr />
      </main>

    </>
  );
}

export default Homepage;
