
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccessKeys.css';
import _ from 'lodash';

class AccessKeys extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(AccessKeys);
