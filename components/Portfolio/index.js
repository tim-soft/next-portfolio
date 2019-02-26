import React from 'react';
import { PortfolioList, PortfolioListItem } from './components';

const listData = [];
for (let i = 0; i < 30; i += 1) {
  listData.push({
    key: i,
    projectTitle: 'Azure Cloud Migration'
  });
}

export default () => (
  <PortfolioList>
    {listData.map(data => (
      <PortfolioListItem {...data} />
    ))}
  </PortfolioList>
);
