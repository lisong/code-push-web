
import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends Component {
  static propTypes = {
    className: PropTypes.string,
    isAuth: PropTypes.bool,
  };

  render() {
    let loginBtnView = (
      <span>
        <Link className={s.link} to="/login">Log in</Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
      </span>
    );
    if (_.get(this.props, 'isAuth') == true) {
      loginBtnView = <Link className={s.link} to="/logout">Log out</Link>

    }
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="/about">About</Link>
        <Link className={s.link} to="/contact">Contact</Link>
        <span className={s.spacer}> | </span>
        {loginBtnView}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
