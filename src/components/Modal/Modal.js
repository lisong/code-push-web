import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Modal.css';
class Modal extends Component{
  render(){
    return(
      <div className={s.modal}>
        {this.props.children}
      </div>
    )
  }
}
export default withStyles(s)(Modal);
