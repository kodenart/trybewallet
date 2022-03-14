// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_CURRENCIES } from '../actions/currency';
import { SET_EXPENSES } from '../actions/expenses';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SET_EXPENSES:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
