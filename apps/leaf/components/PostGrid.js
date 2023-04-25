/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import StoryCard from './StoryCard';

const PostGrid = ({ type, posts, formats, item, header, useSlug = true }) => {
  const slug = useSlug ? item.slug : item.id;
  const filteredPosts = posts.filter((post) => post.published_date !== null);
  const defaultHeader = (item) => (
    <header>
      {/* <h1
        sx={{
          fontSize: [(theme) => `${theme.fontSizes.h5}`, null, (theme) => `${theme.fontSizes.h4}`],
          mb: (theme) => `${theme.space.spacing5}`,
          textTransform: 'capitalize',
          px: (theme) => theme.space.layout2,
        }}
      >
        {item.name}
      </h1> */}
      {/* {item?.description && <p>{item.description}</p>} */}
    </header>
  );
  return (
    <>
      <div>
        <div sx={{
          display: 'flex',
          //justifyContent: 'space-around',
          //alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '5rem',
          mb: '5rem',
        }}>
          {header ? header(item) : defaultHeader(item)}
          {filteredPosts.length > 0 ? (
            <div>
              {filteredPosts.map((item, index) => (
                <StoryCard
                  key={index}
                  cardStyle="simple"
                  storyData={item}
                  excerpt={item.format.slug !== 'fact-check'}
                />
              ))}
            </div>
          ) : (
            <h2 sx={{ textAlign: 'center' }}>No posts found</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default PostGrid;
