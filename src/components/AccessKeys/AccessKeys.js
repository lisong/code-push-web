
import React, { PropTypes, Component } from 'react';
import { Breadcrumb, Table, Button, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccessKeys.css';
import cx from 'classnames';
import _ from 'lodash';
import Link from '../Link';
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
    removeKey: (name) => {},
    patchKey: (name, friendlyName = null, ttl = 0) => {},
    isCreating: false,
    createKey: () => {},
    isShowKey: false,
    close: () => {},
    token: '',
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, index) {
    const self = this;
    const moment = require('moment');
    return (
      <tr key={_.get(rowData, 'id')}>
        <td>
          <MyEditor
            saveData={(str) => {
              if (!_.eq(str, _.get(rowData, 'friendlyName'))) {
                self.props.patchKey(_.get(rowData, 'friendlyName'), str);
              }
            }}
            value={_.get(rowData, 'friendlyName')}
          />
        </td>
        <td>{_.get(rowData, 'createdBy')}</td>
        <td>{_.get(rowData, 'isSession') ? 'session' : 'accessKey'}</td>
        <td>{moment(_.get(rowData, 'createdTime')).fromNow()}</td>
        <td>{moment(_.get(rowData, 'expires')).fromNow()}</td>
        <td>
          <Button
            onClick={() => { self.props.removeKey(_.get(rowData, 'friendlyName')); }}
            bsStyle="danger"
          >
          移除
        </Button>
        </td>
      </tr>
    );
  }

  render() {
    const self = this;
    let tipText = '暂无数据';
    if (this.props.isFetching) {
      tipText = '加载数据中...';
    }
    return (
      <div className={s.root}>
        <PopShowKey
          showModal={this.props.isShowKey}
          value={this.props.token}
          close={this.props.close}
        />
        <div className={s.container}>
          <Breadcrumb>
            <Breadcrumb.Item active>
            密钥列表
          </Breadcrumb.Item>
          </Breadcrumb>
          <Col style={{ marginBottom: '20px' }}>
            <Button
              onClick={() => {
                self.props.createKey();
              }}
              bsStyle="primary"
              disabled={!!this.props.isCreating}
            >
              创建key
            </Button>
          </Col>
          <Table striped bordered condensed hover responsive>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }} >名字</th>
                <th style={{ textAlign: 'center' }} >创建者</th>
                <th style={{ textAlign: 'center' }} >类型</th>
                <th style={{ textAlign: 'center' }} >创建时间</th>
                <th style={{ textAlign: 'center' }} >过期时间</th>
                <th style={{ textAlign: 'center' }} >操作</th>
              </tr>
            </thead>
            <tbody>
              {
                 this.props.rs.length > 0 ?
                 _.map(this.props.rs, (item, index) => self.renderRow(item, index))
                 :
                 <tr>
                   <td colSpan="6" >{tipText}</td>
                 </tr>
               }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(AccessKeys);
