import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';

const LinkWrapper = ({ href, children, ...props }) => {
    const handleClick = () => {
        if (href.charAt(0) === '/') Router.push(href);
        else window.open(href, '_blank');
    };

    return (
        <ListItemContainer
            role="button"
            onClick={handleClick}
            onKeyPress={handleClick}
            tabIndex={0}
            {...props}
        >
            {children}
        </ListItemContainer>
    );
};

LinkWrapper.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default LinkWrapper;

const ListItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    width: 100%;
`;
