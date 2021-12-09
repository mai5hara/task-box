import { useParams } from 'react-router';
import { useDocument } from '../../hooks/useDocument';
import './Project.css';

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return <div className="project-deetails">{document.name}</div>;
};

export default Project;
