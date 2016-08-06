
import React, { PropTypes } from 'react';
import HomeContainer from '../../containers/HomeContainer';
const title = 'CodePush Server';

function Home({ html }, context) {
  context.setTitle(title);
  return (
    <HomeContainer html={html}/>
  );
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Home;
