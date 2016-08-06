
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <img src={logoUrl} width="38" height="38" alt="React" />
          <span className={s.brandTxt}>CodePush Server</span>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
