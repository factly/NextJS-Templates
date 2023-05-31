/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import StoryCard from './StoryCard';


const Homepage = ({ data }) => {
  const { posts } = data;

  const featuredPosts = posts.nodes.slice(0, 3);

  return (
    <>
      <div sx={{ textAlign: 'center', color: '#fff', bg: '#ff0095', minHeight: ['280px', null, '560px'] }}>
        <h2 sx={{ fontWeight: 800, fontSize: ['3.4rem', null, '6rem'], mt: '2.5em', mb: '0.5em' }}>Dega</h2>
        <p sx={{ fontSize: ['2.2rem', null, '2.4rem'] }}>The professional publishing platform</p>
      </div>
      <div>
        {/* <Seo title={space.name} /> */}
        <main sx={{ pt: '0px' }} id="site-main" className="site-main outer">
          <div className="inner posts">
            <div className="post-feed">
              <StoryCard post={featuredPosts[0]} type="large" />

              <StoryCard post={featuredPosts[1]} type="featured" />
              <StoryCard post={featuredPosts[2]} type="featured" />

              {posts.nodes.slice(3).map((post) => (
                <StoryCard post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Homepage;
