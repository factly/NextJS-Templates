import React from 'react';

const parseTiptapContent = (description) => {
  
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};

export default parseTiptapContent;
