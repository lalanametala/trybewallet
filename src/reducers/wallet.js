import { CURR_REQ_FAILURE, CURR_REQ_SUCCESS, REQUIRE } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  headerCurrency: 'BRL',
  totalExp: '0,00',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUIRE:
    return {
      ...state,
    };
  case CURR_REQ_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case CURR_REQ_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case 'SAVE_EXPENSE':
  {
    const expLength = state.expenses.length;
    const expenseObj = {
      ...action.expense,
      id: !expLength ? 0 : expLength,
    };
    return {
      ...state,
      expenses: [...state.expenses, expenseObj],
    };
  }
  case 'CHANGE':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'CHANGE_HEADER_CURR':
    return {
      ...state,
      headerCurrency: action.headerCurrency,
    };
  case 'SAVE_TOTAL':
    return {
      ...state,
      totalExp: action.totalExp,
    };
  default:
    return state;
  }
};

export default wallet;
