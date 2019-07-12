import PropTypes from 'prop-types';
import styled from 'styled-components';

const CoffeeTimeIndicator = ({ readTime }) => {
  const numCoffees = Math.ceil(readTime / 5);
  const Coffee = key => (
    <CoffeeIndicator>
      <span key={key} role="img" aria-label="coffee">
        ☕
      </span>
    </CoffeeIndicator>
  );

  const coffeeArr = [];

  for (let x = 0; x < numCoffees; x += 1) {
    coffeeArr.push(<Coffee key={x} />);
  }

  return coffeeArr;
};

const DateAndDuration = ({ date, readTime }) => (
  <>
    {new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}
    <span>
      <DotSeparator>&#8226;</DotSeparator>
      <CoffeeTimeIndicator readTime={readTime} /> {readTime} mins
    </span>
  </>
);

DateAndDuration.propTypes = {
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired
};

export default DateAndDuration;

const CoffeeIndicator = styled.span`
  > span {
    transition: color 0.2s linear;
    font-size: 1.2em;
  }
`;

const DotSeparator = styled.span`
  font-size: 1.2em;
  margin: 0 3px 0 6px;
`;
