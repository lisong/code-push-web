
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

function Footer() {
  return (
    <footer className={s.root}>
      <div className={s.container}>
        <span className={s.text}>© CodePush Server</span>
        <span className={s.spacer}>·</span>
        <Link className={s.link} to="/">Home</Link>
        <span className={s.spacer}>·</span>
        <a className={s.link} target="_blank" href="https://github.com/lisong/code-push-server/issues/new">Report an issue</a>
      </div>
    </footer>
  );
}

export default withStyles(s)(Footer);
