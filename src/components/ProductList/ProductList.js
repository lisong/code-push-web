
import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductList.css';
import _ from 'lodash';

class ProductList extends Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, index) {
    return (
      <tr key={index}>
        <td>111</td>
        <td>111</td>
        <td>111</td>
        <td>1111</td>
        <td>111</td>
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
                <th>产品名</th>
                <th>拥有者</th>
                <th>类型</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
               {
                 [1,2].length > 0 ?
                 _.map([1,2,2], function (item, index) {
                   return self.renderRow(item, index);
                 })
                 :
                 <tr>
                  <td colSpan="5" >{tipText}</td>
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
