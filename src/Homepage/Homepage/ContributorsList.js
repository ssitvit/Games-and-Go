import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContributorsList = ({ owner, repo }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // Function to fetch contributors from GitHub API
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contributors`
        );
        setContributors(response.data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  return (
    <div className="contributors-list">
      <ul>
        {contributors.map((contributor) => (
          <li key={contributor.id}>
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                width="100"
                height="100"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributorsList;
