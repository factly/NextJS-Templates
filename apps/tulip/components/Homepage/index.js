/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Featured from './Featured';
import FeaturedCategory from './FeaturedCategory';
import Seo from '../Seo';

const Homepage = ({ data }) => {
  const { posts, featuredCategories, space, categories, factchecks } = data;
  const featuredPost = posts.nodes[0];
  return (
    <section>
      {/* <Seo title={space.name} /> */}
      <>
        {posts.nodes.length === 0 && <div>There are no posts to show!</div>}
        <Featured posts={posts.nodes} />
        {/* Featured categories Section  */}
        {featuredCategories?.nodes?.length > 0 && (
          <div>
            {featuredCategories.nodes.map((category) => {
              return <FeaturedCategory category={category} posts={category.posts.nodes} />;
            })}
          </div>
        )}
      </>
    </section>
  );
};

export default Homepage;
