import React from 'react';
import { PortfolioList, PortfolioListItem } from './components';

const listData = [];
for (let i = 0; i < 30; i += 1) {
  listData.push({
    key: i,
    projectTitle: 'Azure Cloud Migration',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    images: [
      {
        original:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1.jpg',
        thumbnail:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/1t.jpg',
        description: 'This image description is a test'
      },
      {
        original:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2.jpg',
        thumbnail:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/2t.jpg',
        description: 'This image description is a test'
      },
      {
        original:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3.jpg',
        thumbnail:
          'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/3t.jpg',
        description: 'This image description is a test'
      }
    ]
  });
}

export default () => (
  <PortfolioList>
    {listData.map(data => (
      <PortfolioListItem {...data} />
    ))}
  </PortfolioList>
);
