
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
        <Link className={s.link} to="/login">登录</Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/register">注册</Link>
      </span>
    );
    if (_.get(this.props, 'isAuth') == true) {
      loginBtnView = <Link className={s.link} to="/logout">安全退出</Link>
    }
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="/apps">应用管理</Link>
        <Link className={s.link} to="/accessKeys">我的密钥</Link>
        {
          _.get(this.props, 'isAuth') == true ?
          <Link className={s.link} to="/users/settings">个人设置</Link>
          : null
        }
        <span className={s.spacer}> | </span>
        {loginBtnView}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
