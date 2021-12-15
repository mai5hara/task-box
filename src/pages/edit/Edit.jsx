/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { useDocument } from '../../hooks/useDocument';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import './Edit.css';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [defaultAssignedUsers, setDefaultAssignedUsers] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { document, error } = useDocument('projects', id);
  const { updateDocument, response } = useFirestore('projects');
  const { documents } = useCollection('users');

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
    if (document) {
      setName(document.name);
      setDetails(document.details);
      setDueDate(dayjs(document.dueDate.seconds * 1000).format('YYYY-MM-DD'));
      setDefaultCategory({
        value: document.category,
        label:
          document.category.charAt(0).toUpperCase() +
          document.category.slice(1),
      });
    }
    if (documents && document) {
      let defaultValueList = [];
      documents.map((user) =>
        document.assignedUsersList.map((assignedUser) => {
          if (assignedUser.id === user.id) {
            defaultValueList.push(user);
          }
        })
      );

      const defaultValues = defaultValueList.map((u) => {
        return { value: u, label: u.displayName };
      });
      setDefaultAssignedUsers(defaultValues);
    }
  }, [documents, document]);

  useEffect(() => {
    setCategory(defaultCategory);
    setAssignedUsers(defaultAssignedUsers);
  }, [defaultCategory, defaultAssignedUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      assignedUsersList,
    };

    await updateDocument(id, project);

    if (!response.error) {
      navigate(`/projects/${id}`);
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Edit a project</h2>
      {!document || !defaultCategory || defaultAssignedUsers.length === 0 ? (
        <p>loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Project details:</span>
            <textarea
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>
          <label>
            <span>Set due date:</span>
            <input
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>
          <label>
            <span>Project category:</span>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
              defaultValue={defaultCategory}
            />
          </label>
          <label>
            <span>Assign to:</span>
            <Select
              onChange={(option) => setAssignedUsers(option)}
              options={users}
              defaultValue={defaultAssignedUsers}
              isMulti
            />
          </label>
          <Link to={`/projects/${id}`}>
            <button>Back</button>
          </Link>
          <button className="btn">Save Changes</button>
          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default Edit;
