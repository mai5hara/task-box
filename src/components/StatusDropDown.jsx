import { forwardRef } from 'react';
import './StatusDropDown.css';

const statusList = ['Not started', 'In progress', 'Late', 'Completed'];

const StatusDropDown = ({ hideDropDown, handleSetstatus }, ref) => {
  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown-title-wrap">
        <div className="dropdown-title">
          <p>Apply status to this project</p>
          <div className="dropdown-close-btn" onClick={hideDropDown}>
            ×
          </div>
        </div>
      </div>
      <ul>
        {statusList.map((list, i) => (
          <li key={i} value={list} onClick={() => handleSetstatus(list)}>
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default forwardRef(StatusDropDown);
