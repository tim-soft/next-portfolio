import styled from 'styled-components';
import ProjectTitle from './components/ProjectTitle';
import ProjectBadge from './components/ProjectBadge';

const ProjectList = styled.ul`
  margin: 3em 0;
  padding: 0 2em;
  list-style-type: none;
  @media (max-width: 900px) {
    padding: 0;
  }
`;

const ProjectListItem = styled.li`
  &:not(:last-child) {
    border-bottom: 2px black solid;
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

export { ProjectBadge, ProjectTitle, ProjectList, ProjectListItem };
