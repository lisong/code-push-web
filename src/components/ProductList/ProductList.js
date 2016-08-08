
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductList.css';
import _ from 'lodash';

class ProductList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    rs: PropTypes.array,
  };

  static defaultProps = {
    isFetching: true,
    rs: [],
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, index) {
    return (
      <tr key={index}>
        <td>{_.get(rowData, 'name')}</td>
        <td style={{ textAlign: 'left' }}>
          <ul>
          {
            _.map(_.get(rowData, 'collaborators'), function (item, email) {
              return (
                <li>
                  {email}
                  <span className={s.permission}>
                    (<em>{_.get(item, 'permission')}</em>)
                  </span>
                  {
                    _.get(item, 'isCurrentAccount') ?
                    <span className={s.isYours}>
                      it's you
                    </span>
                    : null
                  }
                </li>
              );
            })
          }
          </ul>
        </td>
        <td>
          <ul>
          {
            _.map(_.get(rowData, 'deployments'), function (item, email) {
              return (
                <li style={item == 'Production' ? {color: 'green'} : null} >
                  {item}
                </li>
              );
            })
          }
          </ul>
        </td>
        <td></td>
      </tr>
    );
  }

  render() {
    let self = this;
    let tipText = '暂无数据';
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>App列表</h1>
          <table>
            <tbody>
              <tr>
                <th width="15%">产品名</th>
                <th width="45%">成员</th>
                <th width="20%">Deployments</th>
                <th width="20%">操作</th>
              </tr>
               {
                 this.props.rs.length > 0 ?
                 _.map(this.props.rs, function (item, index) {
                   return self.renderRow(item, index);
                 })
                 :
                 <tr>
                  <td colSpan="4" >{tipText}</td>
                 </tr>
               }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ProductList);
