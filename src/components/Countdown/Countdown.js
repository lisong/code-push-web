import React, {PropTypes, Component} from 'react';
import _ from 'lodash';

export default class Countdown extends Component {

  static propTypes = {
    leftTime: PropTypes.number,
    timeoutCb: PropTypes.func,
    renderFunc: PropTypes.func.isRequired,
    renderRetryFunc: PropTypes.func.isRequired,
    level: PropTypes.number,
    second: PropTypes.number,
  };

  static retryTimes = 0;

  static defaultProps = {
    leftTime: 0,
    timeoutCb: ()=> {
    },
    renderFunc: ()=> {
    },
    renderRetryFunc: (retryTimes)=> {
    },
    level: 1,
    second: 1,
  };

  constructor() {
    super();
    Countdown.retryTimes = 0;
    this.state = {leftTime: 0};
    this.leftTimeCount = this.leftTimeCount.bind(this);
    this.leftTimeSplite = this.leftTimeSplite.bind(this);
  }

  componentDidMount() {
    this.leftTimeCount(this.props.leftTime);
  }

  leftTimeCount(time) {
    this.setState({leftTime: time});
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(()=> {
      if (this.state.leftTime <= 0 && this.timer) {
        Countdown.retryTimes += 1;
        this.props.timeoutCb && this.props.timeoutCb();
        clearInterval(this.timer);
      } else {
        this.setState({leftTime: this.state.leftTime - this.props.second});
      }
    }, this.props.second * 1000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  componentWillReceiveProps(props) {
    if (!_.eq(this.props.leftTime, props.leftTime)) {
      this.leftTimeCount(props.leftTime);
    }
  }

  render() {
    if (this.state.leftTime <= 0) {
      return this.props.renderRetryFunc(Countdown.retryTimes);
    }

    return this.props.renderFunc(this.leftTimeSplite(this.state.leftTime, this.props.level));
  }

  leftTimeSplite(leftTime, showLevel=4){
    var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
    if (leftTime > 0) {
      if (showLevel >= 4) {
        day = Math.floor(leftTime / (60 * 60 * 24));
      }
      if (showLevel >= 3) {
        hour = Math.floor(leftTime / (60 * 60)) - (day * 24);
      }
      if (showLevel >= 2) {
        minute = Math.floor(leftTime / 60) - (day * 24 * 60) - (hour * 60);
      }
      second = Math.floor(leftTime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    return {day, hour, minute, second};
  }
}
