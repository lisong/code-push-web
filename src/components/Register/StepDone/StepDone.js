import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StepDone.css';
import Link from '../../Link';

function StepDone() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.formGroup}>
          <span>恭喜！您已经注册成功，快去</span>
          <Link className={s.loginBtn} to="/login">登录</Link>
          <span>吧</span>
        </div>
      </div>
    </div>
  );
}
export default withStyles(s)(StepDone);
