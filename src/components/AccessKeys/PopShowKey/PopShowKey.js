
import React, { PropTypes, Component } from 'react';
import {Modal, Button, FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

class PopShowKey extends Component {
  static propTypes = {
    value: PropTypes.string,
    close: PropTypes.func,
    showModal: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    showModal: false,
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
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>创建密钥成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup validationState="success">
            <FormControl
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
              type="text"
            />
            <HelpBlock>复制上面的密钥, 然后关闭弹框</HelpBlock>
          </FormGroup>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
export default PopShowKey;
