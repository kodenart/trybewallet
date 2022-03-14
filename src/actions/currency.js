// Types
export const SET_CURRENCIES = 'SET_CURRENCIES';
// export const SET_RATES = 'SET_RATES';
// export const GET_CURRENCIES = 'GET_CURRENCIES';

// Actions
export const setCurrencies = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});

// export const setExchangeRate = (payload) => ({
//   type: SET_RATES,
//   payload,
// });

export const fetchCurrencies = () => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json());
  const currenciesOnly = Object.keys(request);
  const withOutUSDT = currenciesOnly.filter((currency) => currency !== 'USDT');
  dispatch(setCurrencies(withOutUSDT));
};

export const fetchExchangeRate = () => async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => data.json());
  return request;
};
