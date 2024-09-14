import { useReducer } from 'react';
import './App.css';

// Define initial state for the calculator
const initialState = {
  currentOperand: '',
  previousOperand: '',
  operation: '',
};

// Reducer function to handle calculator actions
function reducer(state, action) {
  switch (action.type) {
    case 'add_digit':
      if (action.payload === '0' && state.currentOperand === '0') {
        return state;
      }
      if (action.payload === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload}`,
      };
    case 'choose_operation':
      if (state.currentOperand === '') return state;
      if (state.previousOperand !== '') {
        return {
          ...state,
          previousOperand: evaluate(state),
          currentOperand: '',
          operation: action.payload,
        };
      }
      return {
        ...state,
        operation: action.payload,
        previousOperand: state.currentOperand,
        currentOperand: '',
      };
    case 'clear':
      return initialState;
    case 'delete_digit':
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case 'evaluate':
      if (state.operation === '' || state.currentOperand === '' || state.previousOperand === '') {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: '',
        operation: '',
      };
    default:
      return state;
  }
}

// Evaluation logic for calculator operations
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let result = '';
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return '';
  }
  return result.toString();
}

// Calculator component
export default function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type: 'clear' })}>AC</button>
      <button onClick={() => dispatch({ type: 'delete_digit' })}>DEL</button>
      <button onClick={() => dispatch({ type: 'choose_operation', payload: '/' })}>÷</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '1' })}>1</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '2' })}>2</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '3' })}>3</button>
      <button onClick={() => dispatch({ type: 'choose_operation', payload: '*' })}>*</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '4' })}>4</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '5' })}>5</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '6' })}>6</button>
      <button onClick={() => dispatch({ type: 'choose_operation', payload: '-' })}>-</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '7' })}>7</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '8' })}>8</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '9' })}>9</button>
      <button onClick={() => dispatch({ type: 'choose_operation', payload: '+' })}>+</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '.' })}>.</button>
      <button onClick={() => dispatch({ type: 'add_digit', payload: '0' })}>0</button>
      <button onClick={() => dispatch({ type: 'evaluate' })} className="span-two">=</button>
    </div>
  );
}
