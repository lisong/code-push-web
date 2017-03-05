
import React, { PropTypes, Component } from 'react';
import {Breadcrumb, Table} from 'react-bootstrap';
import cx from 'classnames';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Product.css';
import Link from '../Link';

class Product extends Component {
  static propTypes = {
    appName: PropTypes.string,
    items: PropTypes.array
  };

  static defaultProps = {
    appName: '',
    items: [],
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    const self = this;
    const tipText = '暂无数据';
    return (
      <div className={s.root} >
        <div className={s.container}>
        <Breadcrumb>
          <Breadcrumb.Item active={true}>
            <Link to="/apps">应用列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active={true}>
            {this.props.appName}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th style={{ textAlign:'center' }} >Deployments</th>
              <th style={{ textAlign:'center' }} >DeploymentKey</th>
              <th style={{ textAlign:'center' }} >Description</th>
              <th style={{ textAlign:'center' }} >Update Metadata</th>
              <th style={{ textAlign:'center' }} >Install Metrics</th>
              <th style={{ textAlign:'center' }} >操作</th>
            </tr>
          </thead>
          <tbody>
            {
             this.props.items.length > 0 ?
             _.map(this.props.items, (item, index) => self.renderRow(item, index))
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

  renderRow(rowData, index) {
    const deployName = _.get(rowData, 'name');
    return (
      <tr key={index}>
        <td>
          <Link to={`/apps/${this.props.appName}/${deployName}`}>{deployName}</Link>
        </td>
        <td style={{ textAlign: 'left' }}>
          {_.get(rowData, 'key')}
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td />
      </tr>
    );
  }
}
export default withStyles(s)(Product);
