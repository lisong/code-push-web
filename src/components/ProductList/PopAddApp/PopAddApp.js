
import React, { PropTypes, Component } from 'react';
import {Modal, Button, FormGroup, FormControl, HelpBlock, ControlLabel, Col} from 'react-bootstrap';

class PopAddApp extends Component {
  static propTypes = {
    submit: PropTypes.func,
  };

  static defaultProps = {
    submit: (name)=>{},
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.setName = this.setName.bind(this);
    this.setSelect = this.setSelect.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {showModal: false, select:0, name: ''};
  }

  setSelect(event){
    this.setState({select: event.target.value})
  }

  setName(event){
    this.setState({name: event.target.value})
  }

  submit(){
    this.props.submit(name);
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
            <ControlLabel style={{ display:'block' }}>App名字</ControlLabel>
            <FormControl
              style={{ display:'inline-block', width:'60%' }}
              onChange={this.setName}
              value={this.state.value}
              type="text"
            />
            <FormControl
              style={{ display:'inline-block', marginLeft: 10, width:'30%'  }}
              componentClass='select'
              onChange={this.setSelect}
            >
              <option value="0" >请选择后缀</option>
              <option value="1" >-ios</option>
              <option value="2" >-android</option>
            </FormControl>
            <HelpBlock>必须以后缀(-ios|-android)命名</HelpBlock>
          </FormGroup>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
            <Button onClick={this.submit}>确定</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
export default PopAddApp;
