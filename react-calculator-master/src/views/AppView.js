import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/styles/App.css';
import Button from '../components/Button';

var Parser = require('expr-eval').Parser;

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullText: '0',
      resultText: '',
      isResultClicked: false,
      isResultInvalid: false,
    };
  }

  digitClick = (digit) => {
    this.setState((prevState) => {
      let fullText = prevState.isResultClicked ? digit.toString() : prevState.fullText + digit.toString();
      return { fullText, resultText: '', isResultClicked: false };
    });
  };

  operationClick = (operationSign) => {
    this.setState((prevState) => {
      return {
        fullText: prevState.resultText ? prevState.resultText + operationSign : prevState.fullText + operationSign,
        resultText: '',
        isResultClicked: false,
      };
    });
  };

  dotClick = () => {
    this.setState((prevState) => {
      return {
        fullText: prevState.fullText.includes('.') ? prevState.fullText : prevState.fullText + '.',
      };
    });
  };

  functionalButtonClick = (key) => {
    this.setState((prevState) => {
      let { fullText, resultText } = prevState;
      let newFullText = fullText;
      switch (key) {
        case 'AC':
          return { fullText: '0', resultText: '' };
        case 'C':
          newFullText = fullText.length > 1 ? fullText.slice(0, -1) : '0';
          return { fullText: newFullText, resultText: '' };
        case 'MC':
          localStorage.setItem('CALC_M', '0');
          break;
        case 'MR':
          newFullText = localStorage.getItem('CALC_M') || '0';
          return { fullText: newFullText, resultText: '' };
        case 'M+':
          let totalResult = parseFloat(resultText || '0') + parseFloat(localStorage.getItem('CALC_M') || '0');
          localStorage.setItem('CALC_M', totalResult.toString());
          break;
        case 'M-':
          let totalResult2 = parseFloat(resultText || '0') - parseFloat(localStorage.getItem('CALC_M') || '0');
          localStorage.setItem('CALC_M', totalResult2.toString());
          break;
        default:
          break;
      }
    });
  };

  equalClick = () => {
    try {
      let finalResult = this.parseCalculate(this.state.fullText);
      this.setState({ resultText: finalResult.toString(), isResultClicked: true, isResultInvalid: false });
    } catch (error) {
      this.setState({ resultText: 'invalid', isResultClicked: true, isResultInvalid: true });
    }
  };

  parseCalculate = (fullText) => {
    return Parser.evaluate(fullText);
  };

  checkKeyboardEvent = (event) => {
    if (/^[0-9]$/.test(event.key)) {
      this.digitClick(parseInt(event.key));
    } else if (/^[+\-*/]$/.test(event.key)) {
      this.operationClick(event.key);
    } else if (event.key === 'Enter') {
      this.equalClick();
    } else if (event.key === 'Backspace') {
      this.functionalButtonClick('C');
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.checkKeyboardEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.checkKeyboardEvent);
  }

  render() {
    const { fullText, resultText, isResultInvalid } = this.state;
    return (
      <div className="App">
        <div className="calculator-header">
          <h2>AJ Calculator</h2>
        </div>
        <div className="calculator-body">
          <div className="display">
            <span>{fullText}</span>
            {resultText && <span className={isResultInvalid ? 'text-danger' : 'text-success'}>{' = ' + resultText}</span>}
          </div>
          <div className="buttons">
            {[7, 8, 9, '/'].map((item) => (
              <Button key={item} textValue={item} onClick={() => (isNaN(item) ? this.operationClick(item) : this.digitClick(item))} />
            ))}
            {[4, 5, 6, '*'].map((item) => (
              <Button key={item} textValue={item} onClick={() => (isNaN(item) ? this.operationClick(item) : this.digitClick(item))} />
            ))}
            {[1, 2, 3, '-'].map((item) => (
              <Button key={item} textValue={item} onClick={() => (isNaN(item) ? this.operationClick(item) : this.digitClick(item))} />
            ))}
            {[0, '.', '=', '+'].map((item) => (
              <Button key={item} textValue={item} onClick={() => (item === '=' ? this.equalClick() : isNaN(item) ? this.operationClick(item) : this.digitClick(item))} />
            ))}
            <Button textValue="C" onClick={() => this.functionalButtonClick('C')} />
            <Button textValue="AC" onClick={() => this.functionalButtonClick('AC')} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppView;
