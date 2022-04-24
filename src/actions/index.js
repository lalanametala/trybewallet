import currenciesAPI from '../services/currenciesAPI';
import { CURR_REQ_SUCCESS, EXPENSE, LOGIN, REQUIRE } from './actionTypes';

// Actions

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const apiRequest = () => ({
  type: REQUIRE,
});

export const apiOnSuccess = (currencies) => ({
  type: CURR_REQ_SUCCESS,
  currencies,
});

export const apiOnFailure = (error) => ({
  type: 'CURR_REQ_FAILURE',
  error,
});

export const saveExpense = (expense, exchangeRates) => ({
  type: EXPENSE,
  expense: { ...expense, exchangeRates },
});

export const changeExpenses = (expenses) => ({
  type: 'CHANGE',
  expenses,
});

export const changeHeaderCurr = (headerCurrency) => ({
  type: 'CHANGE_HEADER_CURR',
  headerCurrency,
});

// Thunk Functions

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const apiData = await currenciesAPI();
      const currencies = Object.keys(apiData).filter((currency) => currency !== 'USDT');
      dispatch(apiOnSuccess(currencies));
    } catch (error) {
      dispatch(apiOnFailure(error));
    }
  };
}

export function fetchExchangeRates(expense) {
  return async (dispatch) => {
    dispatch(apiRequest());
    try {
      const apiData = await currenciesAPI();
      dispatch(saveExpense(expense, apiData));
    } catch (error) {
      dispatch(apiOnFailure(error));
    }
  };
}
