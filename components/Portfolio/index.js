import styled from 'styled-components';
import ProjectTitle from './components/ProjectTitle';
import ProjectBadge from './components/ProjectBadge';

const ProjectList = styled.ul`
  margin: 3em 0;
  padding: 0;
  list-style-type: none;
`;

const ProjectListItem = styled.li`
  &:not(:last-child) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.pageContentFontColor};
    margin-bottom: 2em;
    padding-bottom: 2em;
  }
  > * :not(h2) {
    margin: 2em 0 0 2em;
    margin-top: 2em;
    margin-left: 2em;
    @media (max-width: 900px) {
      margin-left: 0;
    }
  }
`;

const ProjectBadgeList = styled.div`
  margin-top: 1em;
  > * :last-child {
    margin-right: 0;
  }
`;

export {
  ProjectBadge,
  ProjectBadgeList,
  ProjectTitle,
  ProjectList,
  ProjectListItem
};
