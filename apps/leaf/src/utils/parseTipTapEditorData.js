import React from 'react';

const parseTiptapContent = (description) => {
  // const doc = new DOMParser().parseFromString(description, 'text/html');
  // if (doc.querySelector('.embed-container')) {
  //   doc.querySelector('.embed-container').innerHTML = doc
  //     .querySelector('.embed-container')
  //     .getAttribute('data-html');
  // }

  return <div dangerouslySetInnerHTML={{ __html: description }} className="sc-content sc-canvas" />;
};

export default parseTiptapContent;
