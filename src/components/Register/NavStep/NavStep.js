
import React,{Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavStep.css';
import cx from 'classnames';
import _ from 'lodash';

class NavStep extends Component {
  static propTypes = {
    step: PropTypes.number
  };
  static defaultProps = {
    step: 1
  };

  render() {
    let self = this;
    let navArr = [
      {key: 1, text: '填写邮箱'},
      {key: 2, text: '验证邮箱'},
      {key: 3, text: '设置密码'},
      {key: 4, text: '完成'},
    ]
    return (
      <ul className={cx(s.progress,s.clearfix)}>
      {
        _.map(navArr, function (item, index) {
          return (
            <li
              key={index}
              className={self.props.step == _.get(item, 'key') ? s.current : null}
              >
              <i>{_.get(item, 'key')}</i>
              {_.get(item, 'text')}
              <em/>
            </li>
          )
        })
      }
      </ul>
    )
  }
}

export default withStyles(s)(NavStep);
