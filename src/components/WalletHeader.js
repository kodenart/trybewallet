import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  calcTotal = (arrOfExpenses) => {
    if (arrOfExpenses.length > 0) {
      return arrOfExpenses
        .reduce((a, b) => {
          const value = parseFloat(b.value);
          const rate = parseFloat(b.exchangeRates[b.currency].ask);
          const roundedValue = Math.round((value * rate) * 100) / 100;
          return Math.round((a + roundedValue) * 100) / 100;
        }, 0);
    }
    return 0;
  }

  render() {
    const { email, expenses } = this.props;
    const chosenCurrency = 'BRL';
    return (
      <div>
        <header>
          <div>TrybeWallet</div>
          <div className="infoDiv">
            <p data-testid="email-field">
              {`email: ${email}`}
            </p>
            <p data-testid="total-field">
              {`Despesa Total: ${this.calcTotal(expenses)}`}
            </p>
            <p data-testid="header-currency-field">
              {`Moeda atual: ${chosenCurrency}`}
            </p>
          </div>
        </header>
      </div>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { user: { email }, wallet: { expenses } } = state;
  return { email, expenses };
};

export default connect(mapStateToProps)(WalletHeader);
