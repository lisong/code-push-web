
import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import {
  Navbar,
} from 'react-bootstrap';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';


class Header extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
    noNav: PropTypes.bool,
  };

  static defaultProps = {
    isAuth: false,
    noNav: false
  };

  render() {
    return (
      <Navbar style={{fontWeight:400}} inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
          <Link className={s.brand} to="/">
            <span>CodePush Server</span>
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {_.get(this.props, 'noNav') !== true ? <Navigation isAuth={_.get(this.props, 'isAuth')}/> : null}
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
