/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import StoryCard from './StoryCard';
import parseTiptapContent from '../src/utils/parseTipTapEditorData';

const PostGrid = ({ type, posts, formats, item, header, useSlug = true }) => {
  const slug = useSlug ? item?.slug : item?.degaId;
  const filteredPosts = posts.filter((post) => post.published_date !== null);
  const defaultHeader = (item) => (
    <>
      <h1
        sx={{
          textAlign: 'center',
          fontSize: [(theme) => `${theme.fontSizes.h5}`, null, (theme) => `${theme.fontSizes.h4}`],
          mb: (theme) => `${theme.space.spacing5}`,
          textTransform: 'capitalize',
        }}
      >
        {item?.name}
      </h1>

      <div
        id="category-description"
        sx={{
          maxHeight: '100%',
          overflow: 'hidden',
          px: (theme) => `${theme.space.spacing5}`,
        }}
      >
        {parseTiptapContent(item?.description)}
      </div>
    </>
  );
  return (
    <section>
      <div
        sx={{
          display: 'flex',
          flexDirection: ['column', null, null, 'row'],
          justifyContent: 'space-between',
          borderBottomWidth: [null, null, null, 'px'],
        }}
      >
        <div
          className="main-content"
          sx={{ order: [2, null, null, null, 1], maxWidth: 1560, width: '100%', mx: 'auto' }}
        >
          <div
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pb: (theme) => `${theme.space.spacing6}`,
            }}
          >
            {header ? header(item) : defaultHeader(item)}

            {filteredPosts.length > 0 ? (
              <div
                sx={{
                  display: 'grid',
                  gridTemplateColumns: ['1fr', null, 'repeat( 2, 1fr )', 'repeat( 3, 1fr)'],
                  // px: [null, null, (theme) => `${theme.space.spacing6}`],
                  px: ['24px', null, '24px'],
                  mt: (theme) => `${theme.space.spacing7}`,
                  gridGap: (theme) => `${theme.space.spacing7}`,
                }}
              >
                {filteredPosts.map((item, index) => (
                  <StoryCard key={index} type="basic" post={item} />
                ))}
              </div>
            ) : (
              <h2 sx={{ textAlign: 'center' }}>No posts found</h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostGrid;
