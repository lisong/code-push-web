
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopShowKey.css';
import cx from 'classnames';
import _ from 'lodash';
import Modal from '../../Modal';

class PopShowKey extends Component {
  static propTypes = {
    value: PropTypes.string,
    close: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    close: ()=>{},
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <Modal>
        <div className={s.root}>
          <a href="javascript:;" onClick={this.close} className={s.close}>x</a>
          <h3>复制下面的密钥, 然后关闭弹框</h3>
          <p>
            <input
            value={this.props.value}
            onFocus={(event)=>{
              event.target.select();
            }}
            onClick={(event)=>{
              event.target.select();
            }}
            onMouseOver={(event)=>{
              event.target.select();
            }}
            readOnly
            />
          </p>
          <p><button onClick={this.close} >关闭</button></p>
        </div>
      </Modal>
    )
  }
}
export default withStyles(s)(PopShowKey);
