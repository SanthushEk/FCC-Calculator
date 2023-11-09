import { useState } from "react";
import "./App.css";

function App() {
 // Define state variables to store the answer and expression
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");

// Extract the trimmed expression
  const et = expression.trim();

// Check if the symbol is an operator
  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

// Handle buttons
  const buttonPress = (symbol: string) => {

    //Handle "clear" button
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");

      //Handle "Negative" button
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );

      //Handle "Percentage" button
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());

    //Handle "Equals" button
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();

      //Handle "Zero" button
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }

      //Handle "Decimal" button
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber); 
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  // Define Calculate Function
  const calculate = () => {
    // Check if the last character is an operator
    if (isOperator(et.charAt(et.length - 1))) return;
    // Split the expression into parts
    const parts = et.split(" "); 
    // Initialize an empty array to store the processed parts
    const newParts = [];

    // Iterate through the parts in reverse order
    for (let i = parts.length - 1; i >= 0; i--) {
      // Check if the current part is an operator and the previous part is also an operator
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        // Add the current operator to the newParts array
        newParts.unshift(parts[i]);
  
        // Initialize counters for iteration
        let j = 0;
        let k = i - 1;
  
        // Continue iterating backward until a non-operator part is found
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        // Adjust the index of the current part
        i -= j;
      } else {
        // Add the current part to the newParts array
        newParts.unshift(parts[i]);
      }
    }
  
    // Construct a new expression from the processed parts
    const newExpression = newParts.join(" ");
  
    // Check if the new expression starts with an operator
    if (isOperator(newExpression.charAt(0))) {
      // Evaluate the expression and convert it to a string
      setAnswer(eval(answer + newExpression) as string);
    } else {
      // Evaluate the expression and convert it to a string
      setAnswer(eval(newExpression) as string);
    }
  
    // Reset the expression state variable
    setExpression("");
  };
  
  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <h3 >@SanthushEk</h3>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="expression">{expression}</div>
            <div id="answer">{answer}</div>
            <hr />
          </div>
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="yellow"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("percentage")}
            className="light-gray"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="light-gray"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="dark-gray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="dark-gray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="dark-gray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="light-gray"
          >
            x
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="dark-gray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="dark-gray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="dark-gray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="light-gray"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="dark-gray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="dark-gray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="dark-gray"
          >
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="light-gray">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="yellow"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="dark-gray"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="light-gray"
          >
            =
          </button>
        </div>

      </div>
    </>
  );
}

export default App;