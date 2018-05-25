import React, { Component } from 'react';

const Problematic = () => {
  throw (new Error('버그가 나타났다!'));
  return (
    <div>
      
    </div>
  );
};

class Counter extends Component {
  // error발생가능성을 막아줌 
  // static defaultProps = {
  //   onIncrement: () => console.warn('onIncrement is not defined'),
  //   object: {},
  //   array: []
  // }

  state = {
    number: 0,
    error: false,
    string: '5의 배수',
  }

  constructor(props) {
    super(props);
    console.log('constructor');
  }
  
  componentWillMount() {
    console.log('componentWillMount (deprecated)');
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5 의 배수라면 리렌더링 하지 않음
    console.log('shouldComponentUpdate');
    // if (nextState.number % 5 === 0) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  handleIncrease = () => {
    const { number } = this.state;
    this.setState({
      number: number + 1
    });
  }

  handleDecrease = () => {
    this.setState(
      ({ number }) => ({
        number: number - 1
      })
    );
  }
  
  render() {
    console.log('render');
    if (this.state.error) return (<h1>에러발생!</h1>);
    //error를 사전에 방지  
    // if (!this.props.object || !this.props.array || this.props.array.length ===0) return null;
    // 6이면 에러발생러
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        { this.state.number !== 0 && this.state.number % 5 === 0 && <div>{this.state.string}</div> }
        { this.state.number === 6 && <Problematic /> }
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;