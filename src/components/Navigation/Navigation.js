
import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import history from '../../core/history';

class Navigation extends Component {
  static propTypes = {
    className: PropTypes.string,
    isAuth: PropTypes.bool,
  };

  constructor(){
    super();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    if (selectedKey === 1) {
      history.push('/apps');
    } else if (selectedKey === 2) {
      history.push('/accessKeys');
    } else if (selectedKey === 3.1) {
      history.push('/users/settings');
    } else if (selectedKey === 3.2) {
      history.push('/logout');
    } else if (selectedKey === 4) {
      history.push('/login');
    } else if (selectedKey === 5) {
      history.push('/register');
    }
  }

  render() {
    let loginView = (
      <NavItem eventKey={4} href="#">登录</NavItem>
    );
    let registerView = (
      <NavItem eventKey={5} href="#">注册</NavItem>
    );
    let personNav = (
      <NavDropdown eventKey={3} title="个人设置" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>修改密码</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.2}>安全退出</MenuItem>
      </NavDropdown>
    );
    return (
      <Navbar.Collapse>
        <Nav onSelect={this.handleSelect}>
          <NavItem eventKey={1} href="#">应用管理</NavItem>
          <NavItem eventKey={2} href="#">我的密钥</NavItem>
        </Nav>
        <Nav onSelect={this.handleSelect} pullRight>
          {_.get(this.props, 'isAuth') === true ? personNav : null}
          {_.get(this.props, 'isAuth') !== true ? loginView : null}
          {_.get(this.props, 'isAuth') !== true ? registerView : null}
        </Nav>
      </Navbar.Collapse>
    );
  }
}

export default Navigation;
