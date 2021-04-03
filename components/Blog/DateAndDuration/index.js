import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCoffee } from 'react-icons/fa';

const CoffeeTimeIndicator = ({ readTime }) => {
    const numCoffees = Math.ceil(readTime / 5);
    const Coffee = (key) => <CoffeeLogo key={key} />;

    const coffeeArr = [];

    for (let x = 0; x < numCoffees; x += 1) {
        coffeeArr.push(<Coffee key={x} />);
    }

    return coffeeArr;
};

const DateAndDuration = ({ date, readTime }) => (
    <CoffeeContainer>
        <span>
            {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })}
        </span>
        <DotSeparator>&#8226;</DotSeparator>
        <CoffeeTimeIndicator readTime={readTime} />
        {readTime} mins
    </CoffeeContainer>
);

DateAndDuration.propTypes = {
    date: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
};

export default DateAndDuration;

const CoffeeLogo = styled(FaCoffee)`
    margin: 0 3px;
    height: inherit;
`;

const CoffeeContainer = styled.span`
    display: flex;
    align-items: center;
    svg:last-of-type {
        margin-right: 6px;
    }
`;

const DotSeparator = styled.span`
    font-weight: bold;
    margin: 0 3px 2px 6px;
`;
