import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import AllButton from "./Buttons";

const   CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": (prevValue, nextValue) => nextValue
};

export default class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false
    };
  }

  clearAll() {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false
    });
  }

  clearDisplay() {
    this.setState({
      displayValue: "0"
    });
  }

  clearLastChar() { 
    const { displayValue } = this.state;

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || "0"
    });
  }

  toggleSign() {
    const { displayValue } = this.state;
    const newValue = parseFloat(displayValue) * -1;

    this.setState({
      displayValue: String(newValue)
    });
  }

  inputPercent() {
    const { displayValue,operator,value } = this.state;
    const currentValue = parseFloat(displayValue);
    let newValue=null;
    if (currentValue === 0) return;
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    if(operator!=null){
       newValue = (parseFloat(displayValue) / 100) * value;
    }else{
       newValue = parseFloat(displayValue) / 100;
    }

    this.setState({
      displayValue: String(newValue.toFixed(fixedDigits.length + 2))
    });
  }

  inputDot() {
    const { displayValue } = this.state;
    if (!/\./.test(displayValue)) {
      this.setState({
        displayValue: displayValue + ".",
        waitingForOperand: false
      });
    }
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit
      });
    }
  }

  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  render() {
    const { displayValue } = this.state;
    const clearDisplay = displayValue !== "0";
    const clearText = clearDisplay ? "C" : "AC";
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.result} >{displayValue}</Text>
        </View>
        
        <View style={styles.row}>
          <AllButton
            text={clearText}
            onClick={() =>
              clearDisplay ? this.clearDisplay() : this.clearAll()
            }
          />
          <AllButton text="±" onClick={() => this.toggleSign()} />
          <AllButton text="%" onClick={() => this.inputPercent()} />
          <AllButton text="÷" onClick={() => this.performOperation("/")} />
        </View>
        
        <View style={styles.row}>
          <AllButton text="7" onClick={() => this.inputDigit(7)} />
          <AllButton text="8" onClick={() => this.inputDigit(8)} />
          <AllButton text="9" onClick={() => this.inputDigit(9)} />
          <AllButton text="×" onClick={() => this.performOperation("*")} />
        </View>
        <View style={styles.row}>
          <AllButton text="4" onClick={() => this.inputDigit(4)} />
          <AllButton text="5" onClick={() => this.inputDigit(5)} />
          <AllButton text="6" onClick={() => this.inputDigit(6)} />
          <AllButton text="−" onClick={() => this.performOperation("-")} />
        </View>
        <View style={styles.row}>
          <AllButton text="1" onClick={() => this.inputDigit(1)} />
          <AllButton text="2" onClick={() => this.inputDigit(2)} />
          <AllButton text="3" onClick={() => this.inputDigit(3)} />
          <AllButton text="+" onClick={() => this.performOperation("+")} />
        </View>
        <View style={styles.row}>
          <AllButton
            text="0"
            onClick={() => this.inputDigit(0)}
            textStyle={{ textAlign: "left" }}
          />
          <AllButton text="." onClick={() => this.inputDot()} />
          <AllButton text="=" onClick={() => this.performOperation("=")} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#333"
  },
  result: {
    fontSize: 48,
    color: "white",
    textAlign: "right",
    padding: 24,
    color: "orange",
    paddingTop:120,
  
  },
  resultBox: {
    backgroundColor: "#333",
    width: "100%"
  }
});