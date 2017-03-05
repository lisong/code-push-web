import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {Alert, Fade} from 'react-bootstrap';

class MsgStack extends Component {
  static propTypes = {
    items: PropTypes.array,
    close: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    close: ()=>{}
  };

  intervalId = null;

  checkItemsInterval() {
    const self = this;
    if (this.props.items && this.props.items.length > 0 ) {
      if (this.intervalId) {
        return;
      }
      this.intervalId = setInterval(function () {
        var time = parseInt((new Date()).getTime() /1000)
        _.map(self.props.items, function(item){
          console.log(item);
          if((parseInt(_.get(item, 'time')) + parseInt(_.get(item, 'showTime'))) < time) {
            self.props.close(_.get(item, 'id'));
          }
        })
      }, 1000);
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }

  constructor() {
    super();
    this.checkItemsInterval = this.checkItemsInterval.bind(this);
  }

  componentDidMount() {
    setTimeout(this.checkItemsInterval, 200);
  }

  componentWillReceiveProps(nextProps) {
    this.checkItemsInterval();
  }

  render() {
    const self = this;
    return (
      <div>
        {
          _.map(self.props.items, function (item) {
            var bsStyle = "info";
            if (_.indexOf(["info", "warning", "danger", "success"],item.type)!== -1){
              bsStyle = item.type;
            }
            return  (
              <Alert key={item.id} bsStyle={bsStyle} onDismiss={()=>{self.props.close(item.id)}}>
                {item.text}
              </Alert>
            )
          })
        }
      </div>
    );
  }
}

export default MsgStack;
