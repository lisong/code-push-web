
import React, { PropTypes, Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Col,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import _ from 'lodash';

const popoverFocus = (
  <Popover id="popover-trigger-focus">
    只能包含字母和数字
  </Popover>
);
class PopAddApp extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isOnSubmiting: PropTypes.bool,
    close: PropTypes.func,
    input: PropTypes.func,
    errorTip: PropTypes.string,
    showModal: PropTypes.bool,
    isShowNameError: PropTypes.bool,
    isShowAppTypeError: PropTypes.bool,
    appType: PropTypes.number,
    appName: PropTypes.string,
  };

  static defaultProps = {
    onSubmit: (name)=>{},
    isOnSubmiting: false,
    close: ()=>{},
    input: ()=>{},
    errorTip: '',
    showModal: false,
    isShowNameError: false,
    isShowAppTypeError: false,
    appType: 0,
    appName: '',
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.setName = this.setName.bind(this);
    this.validateName = this.validateName.bind(this);
    this.setSelect = this.setSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setSelect(event){
    let select = parseInt(event.target.value);
    this.props.input({appType:select});
  }

  setName(event){
    let name = event.target.value;
    this.props.input({appName:name});
  }

  validateName(name) {
    const REGEX = /^\w+$/;
    if (REGEX.test(name)) {
      this.setState({isShowNameError:false});
    } else {
      this.setState({isShowNameError:true});
    }
  }

  onSubmit(){
    if (this.props.isOnSubmiting) {
      return;
    }
    this.props.onSubmit();
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>添加App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup style={{display: 'inline-block',width: '60%'}} validationState={this.props.isShowNameError ? `error` : null}>
            <ControlLabel>App名字</ControlLabel>
            <OverlayTrigger trigger={["hover"]} placement="bottom" overlay={popoverFocus}>
            <FormControl
              type="text"
              onChange={this.setName}
              value={this.props.appName}
              autoFocus
            />
            </OverlayTrigger>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup style={{display: 'inline-block',width: '30%',paddingLeft: 15}} validationState={this.props.isShowAppTypeError ? `error` : null}>
            <ControlLabel>类型</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.appType}
              onChange={this.setSelect}
            >
              <option value="0" >请选择后缀</option>
              <option value="1" >-ios</option>
              <option value="2" >-android</option>
            </FormControl>
          </FormGroup>
          <FormGroup validationState="error">
            <HelpBlock>{this.props.errorTip}</HelpBlock>
          </FormGroup>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
            <Button onClick={this.onSubmit} disabled={this.props.isOnSubmiting ? true : false} >确定</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
export default PopAddApp;
