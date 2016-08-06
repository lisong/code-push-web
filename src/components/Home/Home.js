
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div dangerouslySetInnerHTML={{ __html: this.props.html || '' }} />
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Home);
