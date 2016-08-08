
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccessKeys.css';
import cx from 'classnames';
import _ from 'lodash';
import Link from '../Link';
import moment from 'moment';
import MyEditor from '../MyEditor';
import PopShowKey from './PopShowKey';

class AccessKeys extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    rs: PropTypes.array,
    removeKey: PropTypes.func,
    patchKey: PropTypes.func,
    isCreating: PropTypes.bool,
    createKey: PropTypes.func,
    isShowKey: PropTypes.bool,
    close: PropTypes.func,
    token: PropTypes.string,
  };

  static defaultProps = {
    isFetching: true,
    rs: [],
    removeKey: (name)=>{},
    patchKey: (name, friendlyName=null, ttl=0)=>{},
    isCreating: false,
    createKey: ()=>{},
    isShowKey: false,
    close: ()=>{},
    token: '',
  };

  constructor(){
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, index) {
    let self = this;
    return (
      <tr key={index}>
        <td>
        <MyEditor
          saveData={(str)=>{
            if (!_.eq(str, _.get(rowData, 'friendlyName'))) {
              self.props.patchKey(_.get(rowData, 'friendlyName'), str);
            }
          }}
          value={_.get(rowData, 'friendlyName')}
          />
        </td>
        <td>{_.get(rowData, 'createdBy')}</td>
        <td>{_.get(rowData, 'isSession') ? 'session': 'accessKey'}</td>
        <td>{moment(_.get(rowData, 'createdTime')).fromNow()}</td>
        <td>{moment(_.get(rowData, 'expires')).fromNow()}</td>
        <td>
        <button
          onClick={()=>{self.props.removeKey(_.get(rowData, 'friendlyName'))}}
          className={cx(s.btn,s.btnDanger)}
          >
          移除
        </button>
        </td>
      </tr>
    );
  }

  render() {
    let self = this;
    let tipText = '暂无数据';
    if (this.props.isFetching) {
      tipText = '加载数据中...'
    }
    return (
      <div className={s.root}>
      {
        this.props.isShowKey ?
        <PopShowKey
        value={this.props.token}
        close={this.props.close}
        />
        : null
      }
        <div className={s.container}>
          <h1>accessKey列表</h1>
          <span style={{ float:'right', marginBottom:'20px', marginRight:'20px' }}>
            <button
              onClick={()=>{
                self.props.createKey();
              }}
              className={cx(s.btn,s.btnPrimary)} disabled={this.props.isCreating ? true:false  } >
              创建key
            </button>
          </span>
          <table>
            <tbody>
              <tr>
                <th>名字</th>
                <th>创建者</th>
                <th>类型</th>
                <th>创建时间</th>
                <th>过期时间</th>
                <th>操作</th>
              </tr>
               {
                 this.props.rs.length > 0 ?
                 _.map(this.props.rs, function (item, index) {
                   return self.renderRow(item, index);
                 })
                 :
                 <tr>
                  <td colSpan="6" >{tipText}</td>
                 </tr>
               }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(AccessKeys);
