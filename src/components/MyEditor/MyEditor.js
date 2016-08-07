
import React, { PropTypes, Component } from 'react';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';
import _ from 'lodash';

class MyEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    saveData: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    saveData:(str)=>{}
  };

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createWithContent(ContentState.createFromText(_.get(props,'value','')))};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  saveData() {
    var str = this.state.editorState.getCurrentContent().getPlainText();
    this.props.saveData(str);
  }

  handleKeyCommand(command) {
     if (command == 'split-block') {
       //saving
       this.saveData();
       return true;
     }
     return false;
   }
  render() {
    return (
      <Editor
      editorState={this.state.editorState}
      handleKeyCommand={this.handleKeyCommand}
      onChange={this.onChange}
      onBlur={this.saveData}
      />
    );
  }
}
export default MyEditor;
