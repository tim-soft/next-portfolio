import React from 'react';
import { PortfolioList, PortfolioListItem } from './components';

const listData = [];
for (let i = 0; i < 20; i += 1) {
  listData.push({
    key: i,
    projectTitle: 'Azure Cloud Migration',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photos: [
      {
        src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
        caption: 'This is a test caption',
        width: 4,
        height: 3
      },
      {
        src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
        caption: 'This is a test caption',
        width: 1,
        height: 1
      },
      {
        src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
        caption: 'This is a test caption',
        width: 3,
        height: 4
      },
      {
        src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
        caption: 'This is a test caption',
        width: 3,
        height: 4
      },
      {
        src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
        caption: 'This is a test caption',
        width: 3,
        height: 4
      },
      {
        src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
        caption: 'This is a test caption',
        width: 4,
        height: 3
      },
      {
        src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
        caption: 'This is a test caption',
        width: 3,
        height: 4
      },
      {
        src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
        caption: 'This is a test caption',
        width: 4,
        height: 3
      },
      {
        src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
        caption: 'This is a test caption',
        width: 4,
        height: 3
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
