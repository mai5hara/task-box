const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    console.log(newFilter);
    changeFilter(newFilter);
  };

  return (
    <div>
      <div className="tabs is-centered">
        <ul>
          {filterList.map((f) => (
            <li
              key={f}
              onClick={() => handleClick(f)}
              className={`${
                currentFilter === f ? 'is-active' : ''
              } filter-list`}
            >
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectFilter;
