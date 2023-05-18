/** @jsx jsx */
/** @jsxRuntime classic */
// import React from 'react'; // eslint-disable-line no-unused-vars
// import { jsx } from 'theme-ui';
// import StoryCard from './StoryCard';

// const PostGrid = ({ type, posts, formats, item, header, useSlug = true }) => {
//   const slug = useSlug ? item.slug : item.id;
//   const filteredPosts = posts.filter((post) => post.published_date !== null);
//   const defaultHeader = (item) => (
//     <header>
//       {/* <h1
//         sx={{
//           fontSize: [(theme) => `${theme.fontSizes.h5}`, null, (theme) => `${theme.fontSizes.h4}`],
//           mb: (theme) => `${theme.space.spacing5}`,
//           textTransform: 'capitalize',
//           px: (theme) => theme.space.layout2,
//         }}
//       >
//         {item.name}
//       </h1> */}
//       {/* {item?.description && <p>{item.description}</p>} */}
//     </header>
//   );
//   return (
//     <>
//       <div>
//         <div sx={{
//           display: 'flex',
//           //justifyContent: 'space-around',
//           //alignItems: 'flex-start',
//           justifyContent: 'center',
//           gap: '5rem',
//           mb: '5rem',
//         }}>
//           {header ? header(item) : defaultHeader(item)}
//           {filteredPosts.length > 0 ? (
//             <div>
//               {filteredPosts.map((item, index) => (
//                 <StoryCard
//                   key={index}
//                   cardStyle="simple"
//                   storyData={item}
//                   excerpt={item.format.slug !== 'fact-check'}
//                 />
//               ))}
//             </div>
//           ) : (
//             <h2 sx={{ textAlign: 'center' }}>No posts found</h2>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostGrid;


import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Layout from '@components/Layout';
import StoryCard from './StoryCard';
import { AiOutlineTwitter } from 'react-icons/ai';
import { MdFacebook } from 'react-icons/md';

const PostGrid = ({ type, posts, item }) => {
  return (
    <section>
      <main id="sc-main" className="sc-main sc-canvas">
        <section className="sc-pagehead">
          <header className="sc-pagehead-content">
            {/* <div className="sc-tag-label">{type}</div> */}
            {type === 'author' && (
              item.medium?.url?.proxy ? (
                <img sx={{ mb: '1rem' }}
                  className="author-profile-pic"
                  src={item.medium?.url?.proxy}
                  alt={item.name}
                />
              ) : (
                <div
                  className="author-profile-pic-placeholder"
                  sx={{
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    padding: (theme) => `${theme.space.spacing8}`,
                    background: '#000',
                    mb: '1rem',
                  }}
                />
              )
            )}
            <h1 className="sc-tag-name sc-pagehead-title">{item.name}</h1>

            <div className="sc-tag-description sc-pagehead-description">
              A collection of {posts.length} {posts.length === 1 ? 'issue' : `issues`}
            </div>
            <div sx={{ display: 'flex', gap: '8px', fontSize: '24px', mt: '1rem' }}>
              <a href={''}><AiOutlineTwitter sx={{ color: '#979797' }} /></a>

              <a href={''}
              ><MdFacebook sx={{ color: '#979797' }} /></a>
            </div>
          </header>
        </section>

        <div className="sc-feed">
          {posts.map((post) => (
            <StoryCard post={post} />
          ))}{' '}
        </div>
      </main>
    </section>
  );
};

export default PostGrid;
