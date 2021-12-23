import { useParams } from 'react-router';
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
import PacmanLoader from 'react-spinners/PacmanLoader';
import './Project.css';

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return (
      <div className="spinner">
        <PacmanLoader size={40} color={'#286be7'} />
      </div>
    );
  }

  return (
    <div className="project-details page-container">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export default Project;
