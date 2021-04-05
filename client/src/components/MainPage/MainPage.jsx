import React from 'react';

import sampleData from '../../../../server/database/data/sampleFeed.json';

// import ProfileCard from './ProfileCard';
// import FilterButtons from './FilterButtons';
// import Messages from './Messages';
import FeedContainer from './FeedContainer';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: sampleData,
      displayedData: sampleData,
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    const { user } = this.props;
    const { data } = this.state;

    if (filter === 'home') {
      this.setState({
        displayedData: data,
      });
    } else if (filter === 'giveHelp') {
      let feed = [];

      for (let i = 0; i < data.length; i += 1) {
        feed = feed.concat(data[i].projects);
      }

      this.setState({
        displayedData: feed,
      });
    } else if (filter === 'getHelp') {
      let feed = [];

      for (let i = 0; i < data.length; i += 1) {
        feed = feed.concat(data[i].tools);
      }

      this.setState({
        displayedData: feed,
      });
    } else if (filter === 'favorites') {
      const feed = [];

      for (let i = 0; i < data.length; i += 1) {
        for (let j = 0; j < data[i].projects.length; j += 1) {
          const project = data[i].projects[j];
          if (user.favorites[project._id]) {
            feed.push(data[i].projects[j]);
          }
        }
      }

      this.setState({
        displayedData: feed,
      });
    }
  }

  render() {
    // const { user } = this.props;
    const { displayedData } = this.state;

    return (
      <div>
        {/* <ProfileCard user={user} />
        <FilterButtons />
        <Messages /> */}
        <FeedContainer data={displayedData} />
      </div>
    );
  }
}

export default MainPage;
