import React from 'react';
import './DeleteModal.css';
import 'bulma/css/bulma.min.css';

const DeleteModal = ({ modalActive, hideModal, handleDeleteProject }) => {
  return (
    <div className={`modal ${modalActive && 'is-active'}`}>
      <div className="modal-background" onClick={hideModal}></div>
      <div className="modal-card">
        <section className="modal-card-body">
          Are you sure? <br />
          Do you want to delete the project?
          <button
            className="delete"
            aria-label="close"
            onClick={hideModal}
          ></button>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleDeleteProject}>
            Delete Project
          </button>
          <button className="button" onClick={hideModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteModal;
