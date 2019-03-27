import React from "react";
import './style.scss';

const Card = props => {
  const { repo } = props;
  return (
    <div className="cardcontainer">
      <div>
        <img
          className="image"
          src={repo.owner.avatar_url}
          alt="Avatar"
        />
      </div>
      <div>
        <div><strong>Name:</strong> {repo.name}</div>
        <div><strong>Description:</strong>{repo.description}</div>
        <div><strong>Forks Count:</strong>{repo.forks_count}</div>
        <div><strong>Open Issues Count:</strong>{repo.open_issues_count}</div>
        <div><strong>Link to repository:</strong>{repo.url}</div>
      </div>
    </div>
  );
};

export default Card;
