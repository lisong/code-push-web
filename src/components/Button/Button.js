import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Button.css';

class Button extends Component {
  render() {
    return (
      <button className={s.button} {...this.props} >{_.get(this.props, 'value')}</button>
    );
  }
}
export default withStyles(s)(Button);
