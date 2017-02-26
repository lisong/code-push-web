
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
  };

  static defaultProps = {
    appName: '',
  };

  constructor() {
    super();
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
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Product);
