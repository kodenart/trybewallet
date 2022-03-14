import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletTable extends Component {
  render() {
    const tableHeaderItems = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableHeaderItems.map((thElem) => <th key={ thElem }>{thElem}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { description,
              tag, method,
              value, currency,
              exchangeRates } = expense;
              // nome da moeda, ao invés da abreviação
            const currencyName = exchangeRates[currency].name;
            // taxa cambial
            const { [currency]: { ask } } = exchangeRates;
            // valor em reais após aplicar a taxa cambial
            const exchangedValue = (parseFloat(value) * parseFloat(ask));
            const formattedAsk = (parseFloat(ask)).toFixed(2);
            const formattedValue = (parseFloat(value)).toFixed(2);
            return (
              <tr key={ expense.id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{formattedValue}</td>
                <td>{currencyName}</td>
                <td>{formattedAsk}</td>
                <td>Real</td>
                <td>{exchangedValue.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletTable);
