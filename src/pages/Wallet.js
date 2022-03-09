import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    const tempTotal = 0;
    const chosenCurrency = 'BRL';
    return (
      <header>
        <div>TrybeWallet</div>
        <div className="infoDiv">
          <p data-testid="email-field">
            {`email: ${email}`}
          </p>
          <p data-testid="total-field">
            {`Despesa Total: ${tempTotal}`}
          </p>
          <p data-testid="header-currency-field">
            {`Moeda atual: ${chosenCurrency}`}
          </p>
        </div>
      </header>

    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { user: { email } } = state;
  return { email };
};

export default connect(mapStateToProps)(Wallet);
