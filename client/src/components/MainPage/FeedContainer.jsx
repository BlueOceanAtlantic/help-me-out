/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import ProjectCard from './ProjectCard';

const FeedContainer = ({ user, currentFilter, data }) => {
  let title = '';

  if (currentFilter === 'home') {
    title = 'Home';
  } else if (currentFilter === 'giveHelp') {
    title = 'Give Help';
  } else if (currentFilter === 'getHelp') {
    title = 'Get Help';
  } else if (currentFilter === 'favorites') {
    title = 'Favorites';
  }

  return (
    <div>
      <div>{title}</div>
      {data.map((item) => (
        <div key={item._id}>{item.project_name ? <ProjectCard user={user} project={item} /> : `${item.tool_name}`}</div>
      ))}
    </div>
  );
};

FeedContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
    photo: PropTypes.string,
    handy: PropTypes.number.isRequired,
    report: PropTypes.number.isRequired,
    tools: PropTypes.arrayOf(PropTypes.shape({
      tool_name: PropTypes.string,
      tool_photos: PropTypes.arrayOf(PropTypes.string),
      tool_owner: PropTypes.string,
      help: PropTypes.bool,
    })),
    projects: PropTypes.arrayOf(PropTypes.shape({
      project_name: PropTypes.string.isRequired,
      project_description: PropTypes.string,
      project_owner: PropTypes.string.isRequired,
      help: PropTypes.bool.isRequired,
      project_photos: PropTypes.arrayOf(PropTypes.string),
    })),
    favorites: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      favorite_name: PropTypes.string,
      favorite_description: PropTypes.string,
      favorite_owner: PropTypes.string,
      favorite_handy: PropTypes.number,
      favorite_photo: PropTypes.string,
      favorite_photos: PropTypes.arrayOf(PropTypes.string),
    })),
  }).isRequired,
  currentFilter: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      tool_name: PropTypes.string,
      tool_photos: PropTypes.arrayOf(PropTypes.string),
      tool_owner: PropTypes.string,
      help: PropTypes.bool,
    })),
    PropTypes.arrayOf(PropTypes.shape({
      project_name: PropTypes.string.isRequired,
      project_description: PropTypes.string,
      project_owner: PropTypes.string.isRequired,
      help: PropTypes.bool.isRequired,
      project_photos: PropTypes.arrayOf(PropTypes.string),
    })),
  ]),
};

FeedContainer.defaultProps = {
  data: [{}],
};

export default FeedContainer;
