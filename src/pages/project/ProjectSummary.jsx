import { useState, createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../components/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal';
import StatusDropDown from '../../components/StatusDropDown';

const ProjectSummary = ({ project }) => {
  const navigate = useNavigate();
  const { deleteDocument, updateDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const ref = createRef();

  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate('/');
  };

  const showDropDown = () => {
    setShow(true);
  };

  const hideDropDown = () => {
    setShow(false);
  };

  const handleSetstatus = async (value) => {
    await updateDocument(project.id, {
      status: value,
    });
    setShow(false);
  };

  const showModal = () => {
    setModalActive(true);
  };

  const hideModal = () => {
    setModalActive(false);
  };

  const handleDeleteProject = () => {
    deleteDocument(project.id);
    navigate('/');
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        console.log(ref.current);
        setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show, ref]);

  const isAssignedUser = project.assignedUsersList.some(
    (u) => u.id === user.uid
  );

  return (
    <div>
      <div className="project-summary">
        <div className="page-title-wrap">
          <h2 className="page-title">{project.name}</h2>
          <div className="page-title-icons-wrap">
            <Link to={`/edit/${project.id}`} className="page-title-icon-link">
              <div className="page-title-icon-bg edit-icon">
                <FontAwesomeIcon
                  className="page-title-icon"
                  icon={faPencilAlt}
                />
                <p className="page-title-icon-text">Edit</p>
              </div>
            </Link>
            <div onClick={showModal} className="page-title-icon-bg">
              <FontAwesomeIcon className="page-title-icon" icon={faTrash} />
            </div>
            <DeleteModal
              handleDeleteProject={handleDeleteProject}
              modalActive={modalActive}
              hideModal={hideModal}
            />
          </div>
        </div>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <div className="status-wrap">
          {isAssignedUser || user.uid === project.createdBy.id ? (
            <div className="status-title" onClick={() => showDropDown(user.id)}>
              <p>Status</p>
              <div className="status-img"></div>
            </div>
          ) : (
            <p>Status</p>
          )}
          <p className="status-detail">
            {project.status ? project.status : 'None yet'}
          </p>
          {show ? (
            <StatusDropDown
              ref={ref}
              hideDropDown={hideDropDown}
              handleSetstatus={handleSetstatus}
            />
          ) : null}
        </div>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
