import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRate } from '../actions/currency';
import { setExpenses } from '../actions/expenses';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = INITIAL_STATE

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies, ratesFetcher, expenses, dispatchExpenses } = this.props;
    return (
      <div className="expensesForm">

        <input
          onChange={ this.handleChange }
          name="value"
          value={ value }
          type="text"
          data-testid="value-input"
        />

        <input
          onChange={ this.handleChange }
          name="description"
          value={ description }
          type="text"
          data-testid="description-input"
        />

        <label htmlFor="select-currency">
          Moeda
          <select
            onChange={ this.handleChange }
            name="currency"
            id="select-currency"
            aria-label="moeda"
            data-testid="currency-input"
            value={ currency }
          >
            Moeda
            {currencies.map((currencie) => (
              <option
                data-testid={ currencie }
                key={ currencie }
                value={ currencie }
              >
                {currencie}

              </option>
            ))}
          </select>
        </label>

        <label htmlFor="payment-method">
          Método de Pagamento:
          <select
            onChange={ this.handleChange }
            name="method"
            value={ method }
            data-testid="method-input"
            id="payment-method"
          >

            <option
              aria-label="payment-method"
              value="Dinheiro"
            >
              Dinheiro
            </option>

            <option
              aria-label="payment-method"
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>

            <option
              aria-label="payment-method"
              value="Cartão de débito"
            >
              Cartão de débito
            </option>

          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
          >

            <option value="Alimentação" aria-label="tag-input">
              Alimentação
            </option>

            <option value="Lazer" aria-label="tag-input">
              Lazer
            </option>

            <option value="Trabalho" aria-label="tag-input">
              Trabalho
            </option>

            <option value="Transporte" aria-label="tag-input">
              Transporte
            </option>

            <option value="Saúde" aria-label="tag-input">
              Saúde
            </option>

          </select>
        </label>

        <button
          type="submit"
          onClick={ async () => {
            const exchangeRates = await ratesFetcher();
            const id = expenses.length;
            const newExpense = {
              id,
              ...this.state,
              exchangeRates,
            };
            const fullExpenses = [...expenses, newExpense];
            dispatchExpenses(fullExpenses);
            this.setState(INITIAL_STATE);
          } }
        >
          Adicionar despesa

        </button>

      </div>
    );
  }

  // fim do componente
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratesFetcher: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  ratesFetcher: () => dispatch(fetchExchangeRate()),
  dispatchExpenses: (payload) => dispatch(setExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
