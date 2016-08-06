
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>CodePush Server</h1>
          <ul className={s.news}>
          </ul>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Home);
