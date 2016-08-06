
import React, { PropTypes } from 'react';
import HomeContainer from '../../containers/HomeContainer';
const title = 'CodePush Server';

function Home({ news }, context) {
  context.setTitle(title);
  return (
    <HomeContainer/>
  );
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Home;
