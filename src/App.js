import React, { useEffect, useReducer } from 'react';

//declare initial state and reducer
const initialState = {
  balance: 0,
  deposit: '',
  withdraw: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'initialVal': {
      return {
        ...state,
        balance: action.value,
      };
    }
    case 'updateDepositStr': {
      return {
        ...state,
        deposit: action.deposit,
      };
    }
    case 'updateWithdrawalStr': {
      return {
        ...state,
        withdraw: action.withdraw,
      };
    }
    case 'deposit': {
      return {
        ...state,
        balance: parseInt(state.balance) + parseInt(state.deposit),
        deposit: '',
      };
    }
    case 'withdraw': {
      return {
        ...state,
        balance: state.balance - parseInt(state.withdraw),
        withdraw: '',
      };
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
//refactor checking account by using useReducer
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //useEffect to get the value from localStorage to initial value
  useEffect(() => {
    const val = parseInt(localStorage.getItem('balance'));
    if (val) {
      getInitialVal(val);
    }
  }, []);
  //useEffect to send value to localStorage
  useEffect(() => {
    localStorage.setItem('balance', state.balance);
  }, [state.balance]);
  //set initial value for the balance from localStorage
  function getInitialVal(val) {
    dispatch({
      type: 'initialVal',
      value: val,
    });
  }
  //get deposit value from input field
  function updateDepositStr(e) {
    dispatch({
      type: 'updateDepositStr',
      deposit: e.target.value,
    });
  }
  //get withdraw value from input field
  function updateWithdrawalStr(e) {
    dispatch({
      type: 'updateWithdrawalStr',
      withdraw: e.target.value,
    });
  }
  return (
    <div className="container">
      <h1>Your current balance is {state.balance}</h1>
      <div>
        <div>
          <input onChange={updateDepositStr} value={state.deposit} />
          <button onClick={() => dispatch({ type: 'deposit' })}>Deposit</button>
        </div>
        <div>
          <input onChange={updateWithdrawalStr} value={state.withdraw} />
          <button onClick={() => dispatch({ type: 'withdraw' })}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
