
import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';

class Header extends Component {
  static propTypes = {
    isAuth: PropTypes.bool,
  };

  static defaultProps = {
    isAuth: false,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation isAuth={this.props.isAuth} className={s.nav} />
          <Link className={s.brand} to="/">
            <img src={logoUrl} width="38" height="38" alt="React" />
            <span className={s.brandTxt}>CodePush Server</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
