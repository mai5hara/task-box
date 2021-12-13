import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  const category = (name) => {
    let categoryClass;

    if (name === 'mine') {
      return (categoryClass = 'category-mine');
    } else if (name === 'design') {
      return (categoryClass = 'category-design');
    } else if (name === 'development') {
      return (categoryClass = 'category-dev');
    } else if (name === 'marketing') {
      return (categoryClass = 'category-marketing');
    } else if (name === 'sales') {
      return (categoryClass = 'category-sales');
    }

    return categoryClass;
  };

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <p className={`${category(project.category)} category-tag`}>
            {project.category}
          </p>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
