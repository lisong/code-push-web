
import React, { PropTypes, Component } from 'react';
import {Modal, Button, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

class PopAddApp extends Component {
  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {showModal: false};
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>添加App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>App名字</ControlLabel>
            <FormControl
              value={this.props.value}
              type="text"
            />
            <HelpBlock>必须以后缀(-ios|-android)命名</HelpBlock>
          </FormGroup>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
            <Button onClick={this.close}>确定</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
export default PopAddApp;
